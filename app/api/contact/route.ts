import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const verifyTurnstile = async (token: string, remoteIp?: string) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return { ok: false as const, reason: 'missing-secret' };
  }

  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  if (remoteIp) {
    formData.append('remoteip', remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { ok: false as const, reason: 'request-failed' };
  }

  const result = (await response.json()) as TurnstileVerifyResponse;

  if (!result.success) {
    return { ok: false as const, reason: 'verification-failed', codes: result['error-codes'] ?? [] };
  }

  return { ok: true as const };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const subject = body.subject?.trim() ?? '';
    const message = body.message?.trim() ?? '';
    const turnstileToken = body.turnstileToken?.trim() ?? '';

    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Validation anti-spam manquante.' },
        { status: 400 }
      );
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "L'adresse email est invalide." },
        { status: 400 }
      );
    }

    const forwardedFor = request.headers.get('x-forwarded-for') ?? '';
    const remoteIp = forwardedFor.split(',')[0]?.trim();
    const turnstileResult = await verifyTurnstile(turnstileToken, remoteIp || undefined);

    if (!turnstileResult.ok) {
      if (turnstileResult.reason === 'missing-secret') {
        return NextResponse.json(
          { error: 'Configuration captcha manquante.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Echec de la verification anti-spam. Merci de reessayer.' },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST ?? 'ssl0.ovh.net';
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpSecure = (process.env.SMTP_SECURE ?? 'true') === 'true';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'Configuration SMTP manquante.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      replyTo: email,
      to: smtpUser,
      subject: `[Contact Site] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi mail:', error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message pour le moment." },
      { status: 500 }
    );
  }
}

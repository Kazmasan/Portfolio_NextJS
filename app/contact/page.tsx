// app/contact/page.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mail, School, Linkedin, Github, ArrowLeft, Send, Copy, Check } from 'lucide-react';
import { personalInfo } from '@/lib/data';

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: 'auto' | 'light' | 'dark';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function ContactPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSchoolEmail, setCopiedSchoolEmail] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const mountTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current || !window.turnstile) {
      return;
    }

    if (turnstileWidgetIdRef.current) {
      window.turnstile.remove(turnstileWidgetIdRef.current);
      turnstileWidgetIdRef.current = null;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      theme: 'auto',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(null),
      'error-callback': () => setTurnstileToken(null),
    });
  }, [turnstileSiteKey]);

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    if (window.turnstile) {
      mountTurnstile();
      return;
    }

    const scriptId = 'cf-turnstile-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    const handleLoad = () => mountTurnstile();

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad);
      return () => existingScript.removeEventListener('load', handleLoad);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = handleLoad;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [mountTurnstile, turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Merci de valider le contrôle anti-spam avant envoi.'
      });
      return;
    }

    setIsSending(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, turnstileToken })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.");
      }

      setSubmitStatus({
        type: 'success',
        message: 'Message envoyé avec succès. Merci pour votre prise de contact !'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTurnstileToken(null);
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'envoyer le message pour le moment."
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopySchoolEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.emailecole);
      setCopiedSchoolEmail(true);
      setTimeout(() => setCopiedSchoolEmail(false), 1800);
    } catch {
      setCopiedSchoolEmail(false);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-12 px-4 md:px-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Bouton Retour */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour au portfolio
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-white inline-block bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-700 dark:to-teal-800 px-6 py-3 rounded-2xl gradient-fade-hover animate-fade-up">Me contacter</h1>
        <p className="text-slate-700 dark:text-gray-300 mb-12 max-w-2xl mt-6">
          Une opportunité de contrat pro ou de stage pour 2026-2027 ? Une question technique ? 
          N'hésitez pas à m'envoyer un message via le formulaire ou sur mes réseaux.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* COLONNE GAUCHE : FORMULAIRE */}
          <section className="animate-fade-up-delay-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-900 bg-emerald-100 border border-emerald-200 dark:text-white dark:bg-gray-600 dark:border-gray-600 px-4 py-2 rounded-lg inline-block">Votre Nom</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  placeholder="Jean Dupont"
                  className="w-full p-3 rounded-lg border border-emerald-200 dark:border-gray-700 bg-emerald-50 dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-900 bg-emerald-100 border border-emerald-200 dark:text-white dark:bg-gray-600 dark:border-gray-600 px-4 py-2 rounded-lg inline-block">Votre Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  placeholder="nom@entreprise.fr"
                  className="w-full p-3 rounded-lg border border-emerald-200 dark:border-gray-700 bg-emerald-50 dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-900 bg-emerald-100 border border-emerald-200 dark:text-white dark:bg-gray-600 dark:border-gray-600 px-4 py-2 rounded-lg inline-block">Sujet</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  placeholder="Proposition de stage / Contrat pro ou autre"
                  className="w-full p-3 rounded-lg border border-emerald-200 dark:border-gray-700 bg-emerald-50 dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-900 bg-emerald-100 border border-emerald-200 dark:text-white dark:bg-gray-600 dark:border-gray-600 px-4 py-2 rounded-lg inline-block">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  placeholder="Bonjour Kyllian, j'aimerais échanger avec vous concernant..."
                  className="w-full p-3 rounded-lg border border-emerald-200 dark:border-gray-700 bg-emerald-50 dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="rounded-lg border border-emerald-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
                {turnstileSiteKey ? (
                  <div ref={turnstileContainerRef} />
                ) : (
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Captcha non configure. Ajoute NEXT_PUBLIC_TURNSTILE_SITE_KEY dans l'environnement.
                  </p>
                )}
              </div>

              {submitStatus && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-200'
                      : 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSending || !turnstileToken || !turnstileSiteKey}
                className="w-full py-4 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-emerald-700/20"
              >
                {isSending ? 'Envoi en cours...' : 'Envoyer le message'} <Send size={18} />
              </button>
            </form>
          </section>

          {/* COLONNE DROITE : INFOS & LIENS */}
          <section className="space-y-10 animate-fade-up-delay-2">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white inline-block bg-emerald-700 dark:bg-emerald-700 px-5 py-2 rounded-xl">Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700 dark:text-gray-200 interactive-surface p-3 rounded-xl border border-emerald-200 bg-emerald-100/70 dark:border-gray-700 dark:bg-gray-800/60">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg transition-transform duration-300 hover:scale-110">
                    <Mail size={20} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{personalInfo.email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-emerald-300 dark:border-gray-600 hover:bg-emerald-200 dark:hover:bg-gray-700 transition"
                    >
                      {copiedEmail ? <Check size={14} /> : <Copy size={14} />} {copiedEmail ? 'Copié' : 'Copier'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-700 dark:text-gray-200 interactive-surface p-3 rounded-xl border border-emerald-200 bg-emerald-100/70 dark:border-gray-700 dark:bg-gray-800/60">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg transition-transform duration-300 hover:scale-110">
                    <School size={20} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{personalInfo.emailecole}</span>
                    <button
                      type="button"
                      onClick={handleCopySchoolEmail}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-emerald-300 dark:border-gray-600 hover:bg-emerald-200 dark:hover:bg-gray-700 transition"
                    >
                      {copiedSchoolEmail ? <Check size={14} /> : <Copy size={14} />} {copiedSchoolEmail ? 'Copié' : 'Copier'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white inline-block bg-teal-700 dark:bg-teal-700 px-5 py-2 rounded-xl">Réseaux Sociaux</h3>
              <div className="flex gap-4">
                <a 
                  href={`${personalInfo.linkedin}`} 
                  target="_blank"
                  className="p-5 bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
                >
                  <Linkedin size={32} className="text-white" strokeWidth={2.5} />
                </a>
                <a 
                  href={`${personalInfo.github}`} 
                  target="_blank"
                  className="p-5 bg-teal-700 dark:bg-gray-200 hover:bg-teal-800 dark:hover:bg-white rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
                >
                  <Github size={32} className="text-white dark:text-gray-900" strokeWidth={2.5} />
                </a>
              </div>
            </div>

            <div className="p-6 bg-emerald-100/70 dark:bg-gray-800 rounded-2xl border border-dashed border-emerald-300 dark:border-gray-600 interactive-card">
              <p className="text-sm italic text-slate-700 dark:text-gray-300">
                Basé à {personalInfo.location}, je suis mobile et prêt à relever de nouveaux défis dans toute la manche ! N'hésitez pas à me contacter pour discuter de vos projets ou opportunités.
              </p>
            </div>

          </section>

        </div>
      </div>
    </main>
  );
}
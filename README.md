# Next.js Portfolio

Personal portfolio website built with Next.js (App Router), TypeScript, Tailwind CSS, and a contact API powered by Nodemailer.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [SMTP and Turnstile Configuration (.env)](#smtp-and-turnstile-configuration-env)
- [Content Customization](#content-customization)
- [How to Replace Profile Image and Resume](#how-to-replace-profile-image-and-resume)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Build and Production](#build-and-production)
- [Troubleshooting](#troubleshooting)

## Overview

This portfolio includes:

- A homepage with hero, skills, and project sections
- A contact page with a form
- A `POST /api/contact` endpoint for email sending
- A light/dark theme toggle

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Nodemailer
- Lucide React

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

- http://localhost:3000

## SMTP and Turnstile Configuration (.env)

The contact endpoint in `app/api/contact/route.ts` uses environment variables.

Create a `.env` file at the project root:

```env
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_HOST=your-smtp-host
SMTP_PORT=465
SMTP_SECURE=true

NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

Notes:

- `SMTP_USER` and `SMTP_PASS` are required.
- `SMTP_HOST`, `SMTP_PORT`, and `SMTP_SECURE` have defaults in code.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are required to enable Cloudflare human verification.
- Never commit your `.env` file.

Turnstile setup:

1. Create a widget in Cloudflare Turnstile dashboard.
2. Add your local/production domains to the widget configuration.
3. Copy the site key and secret key into the `.env` variables above.

## Content Customization

Main content is centralized in `lib/data.ts`.

You can edit:

- `personalInfo` (name, title, bio, email, links, location, resume link)
- `skills` (technical and soft skills)
- `projects` (experience and project cards)

## How to Replace Profile Image and Resume

This section explains exactly how to update your profile image and resume.

### Key Rule

Any file inside `public/` is served from the site root.

Examples:

- `public/my-photo.jpg` is available at `/my-photo.jpg`
- `public/my-resume.pdf` is available at `/my-resume.pdf`

### 1) Replace the Profile Image

1. Put your image file in `public/` (example: `public/my-photo.jpg`).
2. Open `app/page.tsx`.
3. Update the `Image` component source:

```tsx
<Image src="/my-photo.jpg" alt="Your name" fill className="object-cover" />
```

Important:

- The `src` must start with `/`.
- Do not include `public` in the URL path. Use `/my-photo.jpg`, not `/public/my-photo.jpg`.

### 2) Replace the Resume (CV)

1. Put your resume in `public/` (example: `public/my-resume.pdf`).
2. Open `lib/data.ts`.
3. Update `cvLink` in `personalInfo`:

```ts
cvLink: "/my-resume.pdf"
```

The download button already reads this value in `app/page.tsx`.

### 3) Git Tracking for `public/` Files

If your `.gitignore` contains:

```gitignore
/public/*
```

then all files in `public/` are ignored by Git. Remove or adjust this rule if you want to version images and resume files.

## Available Scripts

```bash
npm run dev     # start development server
npm run build   # production build
npm run start   # run production server
npm run lint    # run linter
```

## Project Structure

```text
app/
  api/contact/route.ts   -> contact endpoint
  contact/page.tsx       -> contact page
  layout.tsx             -> global layout
  page.tsx               -> homepage
components/
  ProjectCard.tsx
  ThemeToggle.tsx
lib/
  data.ts                -> portfolio content
public/                  -> static files (images, resume, assets)
```

## Build and Production

```bash
npm run build
npm run start
```

## Troubleshooting

- `Configuration SMTP missing`: check `SMTP_USER` and `SMTP_PASS`.
- Image not loading: verify file name in `public/` and the `src` path in `app/page.tsx`.
- Resume download not working: verify `cvLink` in `lib/data.ts` and file presence in `public/`.
- Contact form send error: verify SMTP host, port, and secure settings.

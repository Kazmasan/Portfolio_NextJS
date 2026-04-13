import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata = {
  title: 'Portfolio - Kyllian Cavalca',
  description: 'Portfolio développeur - projets, compétences et contact.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeScript = `
    (() => {
      try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      } catch (_) {}
    })();
  `;

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}

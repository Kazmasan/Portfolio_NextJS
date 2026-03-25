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
  return (
    <html lang="fr">
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}

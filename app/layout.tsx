// INVITACION/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'XV',
  description: 'inviticion emma y pau',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Etiqueta de audio para la música de fondo */}
        <audio id="background-music" src="/Christina Perri - A Thousand Years.webm" autoPlay loop playsInline></audio>
        {/* Script para intentar la reproducción automática si es bloqueada por el navegador */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const audio = document.getElementById('background-music');
                if (audio) {
                  // Intenta reproducir el audio
                  audio.play().catch(error => {
                    console.log('Autoplay bloqueado:', error);
                    // Si el autoplay es bloqueado, puedes añadir un botón para que el usuario lo active
                    // o intentar reproducirlo en la primera interacción del usuario.
                    // Por ejemplo, al hacer clic en cualquier parte de la página:
                    document.body.addEventListener('click', () => {
                      audio.play().catch(e => console.log('Error al reproducir tras clic:', e));
                    }, { once: true });
                  });
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
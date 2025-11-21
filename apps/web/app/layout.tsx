import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const chewy = localFont({
  src: './fonts/Chewy-Regular.ttf',
  variable: '--chewy',
});

export const metadata: Metadata = {
  title: 'Choisis pour moi',
  description: 'Compagnon utile quand on sait pas quel jeu ou quel vinyle sortir du placard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${chewy.variable}`}>{children}</body>
    </html>
  );
}

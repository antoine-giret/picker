import localFont from 'next/font/local';

import '../globals.css';
import { Providers } from '../providers';

import Header from './header';

const chewy = localFont({
  src: '../fonts/Chewy-Regular.ttf',
  variable: '--chewy',
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${chewy.variable} flex flex-col min-h-dvh`}>
        <Header />
        <main className="flex flex-col grow-1 w-7xl max-w-full mx-auto px-6 lg:px-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

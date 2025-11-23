import { BoardGameEditorsService } from '@repo/api/services/board-game-editors';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import '../globals.css';

import Content from './content';
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
  const boardGameEditorsPromise = BoardGameEditorsService.findAll();

  return (
    <html lang="fr">
      <body className={`${chewy.variable} flex flex-col min-h-dvh`}>
        <Header />
        <main className="flex flex-col grow-1 w-7xl max-w-full mx-auto px-6 lg:px-8">
          <Suspense fallback={children}>
            <Content boardGameEditorsPromise={boardGameEditorsPromise}>{children}</Content>
          </Suspense>
        </main>
      </body>
    </html>
  );
}

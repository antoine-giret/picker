import localFont from 'next/font/local';

import '../globals.css';

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
      <body className={`${chewy.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

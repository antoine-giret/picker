import type { Metadata } from 'next';

import './globals.css';

import RootLayout from './layout/index';

export const metadata: Metadata = {
  title: 'Quoi sortir ?',
  description: 'Application utile quand on ne sait pas quel jeu ou quel vinyle sortir du placard.',
};

export default RootLayout;

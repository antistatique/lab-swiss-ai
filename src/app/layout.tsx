import React from 'react'; // Add import statement for React
import type { Metadata } from 'next';
import { Instrument_Sans, Montagu_Slab } from 'next/font/google';

import en from '@/locales/en';

import '@/styles/index.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const montaguSlab = Montagu_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montagu-slab',
});

export const metadata: Metadata = {
  title: en.intro.title.replace(/<[^>]*>/g, ' '),
  description: en.intro.credits.replace(/<[^>]*>/g, ' '),
  openGraph: {
    images: 'https://maya.antistatique.net/image/opengraph-image.jpg',
  },
};

const RootLayout = (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }> // Change function component to arrow function
) => (
  <html
    lang="en"
    className={`${montaguSlab.variable} ${instrumentSans.variable}`}
  >
    <body className="text-stone-900 font-base leading-5">{children}</body>
  </html>
);
export default RootLayout;

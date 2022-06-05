import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Head>
      <title>MyTop - наш лучший топ</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      <Component {...pageProps} />
    </Head>
  );
}

export default MyApp;
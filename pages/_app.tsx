import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Admin-Panel</title>
        <meta name="description" content="Test Task for Ivashin Yury" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
        <div className={''}>
            <Component {...pageProps} />
        </div>
    </>
  );
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../store/store';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Admin-Panel</title>
        <meta name="description" content="Test Task for Ivashin Yury" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

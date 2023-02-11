import { useEffect } from 'react';
import '../styles/globals.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    defineCustomElements(window)

  }, [])
  return <Component {...pageProps} />
}


export default MyApp

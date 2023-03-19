import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { collection } from 'firebase/firestore';
import { firestore } from '../environments/firebase.utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    defineCustomElements(window)

  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}


export default MyApp

import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PastQuestionsContext } from "../contexts/PastQuestions"
import { getDocumentsFromFirestore } from "../firebase";
import { collection } from 'firebase/firestore';
import { firestore } from '../environments/firebase.utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function MyApp({ Component, pageProps }) {
  const ref = collection(firestore, "past-questions");

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
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}


export default MyApp

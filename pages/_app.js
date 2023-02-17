import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PastQuestionsContext } from "../contexts/PastQuestions"
import { getDocumentsFromFirestore } from "../firebase";
import { collection } from 'firebase/firestore';
import { firestore } from '../environments/firebase.utils';

function MyApp({ Component, pageProps }) {
  const ref = collection(firestore, "past-questions");
  const [pastQuestionsArray, setPastQuestions] = useState([])

  useEffect(() => {
    defineCustomElements(window)

    const docs = getDocumentsFromFirestore(ref, false);
    docs.then(val => setPastQuestions(val))
  })

  return (
    <PastQuestionsContext.Provider value={pastQuestionsArray}>
      <Component {...pageProps} />
    </PastQuestionsContext.Provider>
  )
}


export default MyApp

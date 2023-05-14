import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { auth, firestore } from "../environments/firebase.utils";
import { PastQuestion, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { currentUserAtom } from "../jotai";
import { Preferences } from "@capacitor/preferences";

export const useSimilarQuestions = () => {
    const ref = collection(firestore, "past-questions");
    const [currentUser] = useAtom(currentUserAtom)
    
    const fetchSimilar = async () => {
        const res = await Preferences.get({
            key: 'user_id'
        })
        let documents = [] as PastQuestion[]


        if(!res.value) {
            let documents = [] as PastQuestion[]
            const allDocsSnapshot = await getDocs(ref);
            allDocsSnapshot.forEach((doc) => {
                documents = [...documents, { id: doc.id, ...doc.data() as any }]
            })
            return documents
        }
        
        const profileRef = doc(firestore, 'users', res.value);
        const result = await getDoc(profileRef);
        const profile = result.data()! as User;

        const queryRef = query(ref, where('department', '==', profile.department), limit(5))
        const snapshot = await getDocs(queryRef);
        if(snapshot.empty) {
            let documents = [] as PastQuestion[]
            const allDocsSnapshot = await getDocs(ref);
            allDocsSnapshot.forEach((doc) => {
                documents = [...documents, { id: doc.id, ...doc.data() as any }]
            })
            return documents
        }

        snapshot.forEach((doc) => {
            documents = [...documents, { id: doc.id, ...doc.data() as any }]
        })
        return documents
    }

    const { isLoading, data, error } = useQuery(["similar-questions"], fetchSimilar)
    return { isLoading, data, error };
}
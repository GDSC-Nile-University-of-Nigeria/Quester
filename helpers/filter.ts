import { collection, query, where } from "firebase/firestore"
import { firestore } from "../environments/firebase.utils"
import { ref } from "firebase/storage";


export const filterBy = async (
    year: string, 
    department: string,
    level: string) => 
    {
        
    const ref = collection(firestore, 'past-questions');
}
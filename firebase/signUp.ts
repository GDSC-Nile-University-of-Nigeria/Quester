import { auth, firestore } from "../environments/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export const signUpWithEmailAndPassword = async (email:string, password:string): Promise<'success'|'failure'> => {
    try {
        const details = await createUserWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(firestore, `users/${details.user.uid}`);
        await setDoc(userDocRef, {})
        return "success";
    } catch (e) {
        console.error(e)
        return "failure";
    }
}
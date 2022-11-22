import { auth, firestore } from "../environments/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onSnapshot, doc, setDoc } from "firebase/firestore";


export const loginWithEmailAndPassword = async (email:string, password:string) => {
    try {
        let user:any;
        const details = await signInWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(firestore, `users/${details.user.uid}`);
        onSnapshot(userDocRef, {
            next: ((snapshot) => {
                if(snapshot.exists())
                    user = snapshot.data()
                else
                    user = null;
                return { user, message: "User gotten sucessfully" }
            }),
            error: ((error) => {
                return { user, message: error.code }
            })
        })
    } catch (e) {
        console.error(e)
    }
}
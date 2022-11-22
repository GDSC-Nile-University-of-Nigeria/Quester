import { auth, firestore } from "../environments/firebase.utils";
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { onSnapshot, doc, setDoc } from "firebase/firestore";

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
    login_hint: "221103006@nileuniversity.edu.ng"
})

export const loginWithMicrosoft = async () => {
    try {
        let user:any;
        const details = await signInWithPopup(auth, provider)
        const userDocRef = doc(firestore, `users/${details.user.uid}`)
        onSnapshot(userDocRef, {
            next: ((snapshot) => {
                if(snapshot.exists())
                    user = snapshot.data()
                else
                    setDoc(userDocRef, {})
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
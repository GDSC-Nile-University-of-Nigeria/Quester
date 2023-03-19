import { NextPage } from "next";
import Image from "next/image";
import { Input } from "../../components/Input";
import styles from "./login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../environments/firebase.utils";
import { useState } from "react";
import { useRouter } from "next/router";
import { AlertColor } from "@mui/material";
import { Toast } from "../../components/Toast";
import { Preferences } from '@capacitor/preferences';
import { getDocumentFromFirestore } from "../../firebase";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../jotai";
import { User } from "../../types";

const LoginPage: NextPage = () => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    const [toast, setToast] = useState<{
        open: boolean; message: string, color?:AlertColor}>({ open: false, message: '' });

    auth.onAuthStateChanged((user) => {
        if(user){
            router.push('/dashboard/home')
        }
    })

    const loginWithEmail = async (e:any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data)

        try {
            const { user } = await signInWithEmailAndPassword(auth, entries.email as string, entries.password as string)
            const [profileInfo, _] = await Promise.all([
                await getDocumentFromFirestore(`users/${user.uid}`),
                await Preferences.set({
                    key: 'user_id',
                    value: user.uid
                })
            ])
            setCurrentUser(profileInfo! as User)
            setToast({ open: true, message: "Sign In Sucessful", color: "success" });
            return router.push("/dashboard/home")

        } catch (err:any) {
            return setToast({ open: true, message: err.code, color: "error" });
        }
    }

    const loginWithMicrosoft = async () => {

    }
    return(
        <main>
            <div className={styles.logo}>
                <Image src="/images/logo.svg" width={'179px'} height={'54px'}/>
                <p>Go back in time to discover the future</p>
            </div>

            <form onSubmit={loginWithEmail}>
                <Input
                    labelName="Email Address"
                    placeholder="quester@edu.ng"
                    type="email"
                    name="email"
                />

                <Input
                    labelName="Password"
                    placeholder="Your secret"
                    type="password"
                    name="password"
                />

                <button className={styles.loginButton}>
                    Login
                </button>
            </form>
            <div className={styles.or}>
                <hr />or<hr />
            </div>

            <button className={styles.microsoftButton}>
                <img src="/images/microsoft.svg" alt="microsoft logo"/>
                Login with Microsoft
            </button>
            <Toast
                isOpen={toast.open}
                message={toast.message}
                onClose={() => setToast({ open: false, message: "" })}
            />
        </main>
    )
}

export default LoginPage;


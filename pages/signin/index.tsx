import { NextPage } from "next";
import Image from "next/image";
import { Input } from "../../components/Input";
import styles from "../login/login.module.scss";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../environments/firebase.utils";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { Select } from "../../components/Input/select";


const SigninPage: NextPage = () => {
    const router = useRouter();

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
            await signInWithEmailAndPassword(auth, entries.email as string, entries.password as string)
            alert("sucesss")
            router.push("/home")
        } catch (err) {
            console.log(err)
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
                    labelName="Full name"
                    placeholder="quester@edu.ng"
                    type="text"
                    name="FullName"
                />
                <Input
                    labelName="Department"
                    placeholder="software engineering"
                    type="text"
                    name="department"
                />
               <Select 
               labelName="Level"
               >
                     <option value="100">100</option>
                     <option value="200">200</option>
                     <option value="300">300</option>
                     <option value="400">400</option>
               </Select>
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
                <Input
                    labelName="Confirm Password"
                    placeholder="Your secret"
                    type="password"
                    name="confirmPassword"
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
        </main>
    )
}

export default SigninPage;


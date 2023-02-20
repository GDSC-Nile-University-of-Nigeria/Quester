import { NextPage } from "next";
import Image from "next/image";
import { Input } from "../../components/Input";
import styles from "../login/login.module.scss";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../environments/firebase.utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select } from "../../components/Input/select";
import { DEPARTMENTS } from "../../helpers/departments";
import { addNewDocumentWithId } from "../../firebase";
import { AlertColor } from "@mui/material";


const SigninPage: NextPage = () => {
    const router = useRouter();
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
        const { confirmPassword, ...rest } = entries;

        if(confirmPassword !== rest.password) return

        try {
            const { user } = await createUserWithEmailAndPassword(auth, entries.email as string, entries.password as string)
            
            try {
                await addNewDocumentWithId('users', user.uid, {
                    uid: user.uid,
                    ...rest 
                })
                setToast({ open: true, message: "Sign Up Sucessful", color: "success" });
                router.push("/dashboard/home")
            } catch (err:any) {
                setToast({ open: true, message: err.code, color: "error" });
            }
            
        } catch (err:any) {
            setToast({ open: true, message: err.code, color: "error" });
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
                    name="name"
                    required
                />

                <Input
                    labelName="ID Number"
                    placeholder="eg. 191103003"
                    type="text"
                    name="student_id"
                />

                <Select
                    labelName="Department"
                    name="department"
                    required
                >
                    {
                        DEPARTMENTS.map(department => (
                            <option value={department.name}>
                                {department.name}
                            </option>
                        ))
                    }
                </Select>
                <Select 
                    labelName="Level"
                    name="level"
                    required
                >
                     <option value="100">100</option>
                     <option value="200">200</option>
                     <option value="300">300</option>
                     <option value="400">400</option>
                     <option value="500">500</option>
                     <option value="500">500</option>
                     <option value="Post Graduate">
                        Post Graduate
                     </option>
               </Select>
                <Input
                    labelName="Email Address"
                    placeholder="eg. quester@gmail.com"
                    type="email"
                    name="email"
                />

                <Input
                    labelName="Password"
                    placeholder="Enter a password"
                    type="password"
                    name="password"
                />
                <Input
                    labelName="Confirm Password"
                    placeholder="Confirm your password"
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


import { NextPage } from "next";
import Image from "next/image";
import { Input } from "../../components/Input";
import styles from "./login.module.scss"


const LoginPage: NextPage = () => {
    return(
        <main>
            <div className={styles.logo}>
                <Image src="/images/logo.svg" width={'179px'} height={'54px'}/>
                <p>Go back in time to discover the future</p>
            </div>

            <form>
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
        </main>
    )
}

export default LoginPage;


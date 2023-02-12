import { NextPage } from "next";
import { Tabs } from "../../components/Tabs";
import { auth, firestore } from "../../environments/firebase.utils";
import { InputBase } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/Home.module.scss"
import { useEffect, useState } from "react";
import { useDebouce } from "../../hooks/useDebouce";

const HomePage: NextPage = () => {
    const { currentUser } = auth;
    const [queryString, setQueryString] = useState("");
    const { debouncedValue } = useDebouce(queryString);

    useEffect(() => {
        console.log(debouncedValue)
    }, [queryString])

    return(
        <main>
            <h1 className={styles.Greeting}>
                Welcome, {currentUser?.displayName}
            </h1>
            
            <div className={styles.Searchbar}>
                <FaSearch/>
                <InputBase 
                    onChange={(e) => setQueryString(e.target.value)}
                    placeholder="Search for a past question" 
                    type="search"
                />
            </div>
            <div>
                <h3>Recents</h3>
                
            </div>
            <Tabs/>
        </main>
    )
}

export default HomePage;
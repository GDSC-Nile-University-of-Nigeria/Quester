import { NextPage } from "next";
import { Tabs } from "../../components/Tabs";
import { auth, firestore } from "../../environments/firebase.utils";
import { Avatar, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/Home.module.scss"
import { useContext, useEffect, useState } from "react";
import { useDebouce } from "../../hooks/useDebouce";
import { useQuery } from "@tanstack/react-query";
import { getDocumentsFromFirestore, updateDocInFirestore } from "../../firebase";
import { arrayUnion, collection } from "firebase/firestore";
import { PastQuestionsContext } from "../../contexts/PastQuestions";
import { MdDownload, MdFolder } from "react-icons/md";
import { PastQuestion } from "../../types";
import Head from "next/head";

const HomePage: NextPage = () => {
    const { currentUser } = auth;
    const [queryString, setQueryString] = useState("");
    //const { debouncedValue } = useDebouce(queryString);
    const ref = collection(firestore, "past-questions");


    const { isLoading, data } = useQuery(["recent-past-questions"], async () => {
        const data = await getDocumentsFromFirestore(ref, false)
        return data
    }, {
        onSuccess: (data) => {
            if(!data) return;
            //console.log(data)
        }
    })  

    const addToDownloads = async (question: PastQuestion) => {
        try {
            await updateDocInFirestore(`users/${currentUser?.uid}`, {
                downloads: arrayUnion(question)
            })
        } catch (err) {
            //bring up toast
        }
    }
    return(
        <main>
            <Head>
                <title>Home</title>
            </Head>
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
                <h3>Recently Added</h3>
                <List>
                    { isLoading ? <p>Loading...</p> : null }
                    {
                        !isLoading && data === undefined ? <p>Noquestions have been added yet</p>:
                        data?.map((question:PastQuestion) => (
                            <ListItem
                                key={`${question.course.name}-${question.year}`}
                                secondaryAction={
                                    <IconButton 
                                        onClick={() => addToDownloads(question)}
                                        target="_blank" 
                                        download={true} 
                                        href={question.image_url}
                                    >
                                        <MdDownload/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <MdFolder/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={question.course.name.replaceAll("-", " ")}
                                    secondary={question.year}
                                />
                            </ListItem>
                        ))
                    }
                </List>
                              
            </div>
            <Tabs/>
        </main>
    )
}

export default HomePage;
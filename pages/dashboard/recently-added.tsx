import { AppBar, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ref } from "firebase/storage";
import { NextPage } from "next";
import { IoIosArrowBack } from "react-icons/io";
import { getDocumentsFromFirestore, updateDocInFirestore } from "../../firebase";
import { arrayUnion, collection } from "firebase/firestore";
import { MdDownload, MdFolder } from "react-icons/md";
import { auth, firestore } from "../../environments/firebase.utils";
import { PastQuestion } from "../../types";

const RecentlyAddedPage:NextPage = () => {
    const ref = collection(firestore, "past-questions");
    const { currentUser } = auth;

    const { isLoading, data } = useQuery(["recent-past-questions"], async () => {
        const data = await getDocumentsFromFirestore(ref, false)
        return data
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


    return (
        <main>
            <AppBar>
                <Toolbar>
                    <IconButton 
                        href="/dashboard/home" 
                        edge="start"
                    >
                        <IoIosArrowBack/>
                    </IconButton>
                    <h3>Recently Added</h3>
                </Toolbar>
            </AppBar>

            <List sx={{ marginTop: 7 }}>
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
                                primary={question.course.name.replaceAll("-", " ") + " " + question?.type}
                                secondary={question.year}
                            />
                        </ListItem>
                    ))
                }
            </List>

        </main>
    )
}

export default RecentlyAddedPage;
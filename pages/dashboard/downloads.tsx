import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { getDocumentFromFirestore } from "../../firebase";
import { auth } from "../../environments/firebase.utils";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { PastQuestion, User } from "../../types";
import { MdDownload, MdFolder } from "react-icons/md";
import { Tabs } from "../../components/Tabs";
import { useId } from "react";

const DownloadsPage: NextPage = () => {
    const { currentUser } = auth;
    
    const { isLoading, data } = useQuery(["user-profile"], async () => {
        if(!currentUser) return;
        const data = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false)
        return data as User
    })

    return(
        <main>
            
            <h2>Downloads</h2>

            <List>
                { isLoading ? <p>Loading...</p> : null }
                {
                    !isLoading && data === undefined ? <p>User does not exist</p> :

                    data?.downloads?.map((question:PastQuestion) => {
                        return (
                            <ListItem
                                key={`${question.year} - ${question.course.name}`}
                                secondaryAction={
                                    <IconButton 
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
                        )
                    })
                    
                }
            </List>
            <Tabs/>
        </main>
    )
}

export default DownloadsPage;
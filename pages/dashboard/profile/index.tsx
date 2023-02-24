import { NextPage } from "next"
import { auth } from "../../../environments/firebase.utils";
import { updateProfile } from "firebase/auth";
import Image from "next/image";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, SxProps, Tab, TextField } from "@mui/material";
import { Tabs } from "../../../components/Tabs";
import styles from "../../../styles/profile.module.scss";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { getDocumentFromFirestore, uploadPicture } from "../../../firebase";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../types";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

const ProfilePage: NextPage = () => {
    const { currentUser } = auth;
    const name = currentUser?.displayName?.replaceAll(" ", "-")

    async function changeAvatar () {
        await Camera.getPhoto({
            source: CameraSource.Prompt,
            quality: 100,
            resultType: CameraResultType.Base64
        })
        .then(async (photo) => {
            if(!photo.base64String || !currentUser) return

            const result = await uploadPicture(`avatars/${currentUser.uid}.png`, photo.base64String)
            updateProfile(currentUser, {
                photoURL: result
            })
        })
    }

    function changeName() {
        if(!currentUser) return
        updateProfile(currentUser, {
            displayName: "Fortune Alebiosu"
        })
    }

    

    const { isLoading, data:profile } = useQuery(["user-profile"], async () => {
        if(!currentUser) return;
        const data = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false)
        return data as User
    })

    const listStyle: SxProps = {
        '.MuiList-padding' : {
            padding: "8px"
        }
    }


    return(
        <main>
            <section className={styles.ProfileHeader}>
                <Avatar 
                    onClick={changeAvatar}
                    sx={{ width: 95, height: 95 }}
                    src={currentUser?.photoURL || `https://api.dicebear.com/5.x/adventurer/svg?seed=${name}`} 
                />
                <div>
                    <h2>{currentUser?.displayName}</h2>
                    <p>{profile?.level + " Level"}</p>
                </div>
            </section>

            <List
                sx={listStyle}
                subheader={
                    <ListSubheader>
                        Settings
                    </ListSubheader>
                }
            >
                <ListItem disablePadding divider>
                    <ListItemButton
                        disableGutters 
                        href="/dashboard/profile/edit-personal"
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <MdPerson/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Profile Information"
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding divider>
                    <ListItemButton
                        disableGutters 
                        href="/dashboard/profile/edit-personal"
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <MdEmail/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Change Email"
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding divider>
                    <ListItemButton
                        disableGutters 
                        href="/dashboard/profile/edit-personal"
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <MdLock/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Change Password"
                        />
                    </ListItemButton>
                </ListItem>

            </List>

            <Tabs/>

        </main>
    )
}

export default ProfilePage;
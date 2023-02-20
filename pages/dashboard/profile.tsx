import { NextPage } from "next"
import { auth } from "../../environments/firebase.utils";
import { updateProfile } from "firebase/auth";
import Image from "next/image";
import { Avatar, SxProps, Tab, TextField } from "@mui/material";
import { Tabs } from "../../components/Tabs";
import styles from "../../styles/profile.module.scss";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { getDocumentFromFirestore, uploadPicture } from "../../firebase";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types";

const ProfilePage: NextPage = () => {
    const { currentUser } = auth;
    const name = currentUser?.displayName?.replaceAll(" ", "-")

    async function changeAvatar () {
        const imageUrl = await Camera.getPhoto({
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

    const inputStyles: SxProps = {
        width: "100%",
        margin: "5px 0"
    }

    const { isLoading, data:profile } = useQuery(["user-profile"], async () => {
        if(!currentUser) return;
        const data = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false)
        return data as User
    })


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

            <form className={styles.EditProfile}>
                <TextField
                    sx={inputStyles}
                    name="displayName"
                    label="Name"
                    value={currentUser?.displayName}
                />
                <TextField
                    sx={inputStyles}
                    name="idNumber"
                    label="ID Number"
                    value={profile?.student_id}
                />
                <TextField
                    sx={inputStyles}
                    name="level"
                    label="Level"
                    value={profile?.level}
                />
                <TextField
                    sx={inputStyles}
                    type="email"
                    name="email"
                    label="Email"
                    value={profile?.email}
                />

            </form>

            <Tabs/>

        </main>
    )
}

export default ProfilePage;
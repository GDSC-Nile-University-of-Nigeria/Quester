import { NextPage } from "next";
import styles from "../../../styles/profile.module.scss";
import { Button, SxProps, TextField } from "@mui/material";
import { auth } from "../../../environments/firebase.utils";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../types";
import { getDocumentFromFirestore, updateDocInFirestore } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { DEPARTMENTS } from "../../../helpers/departments";
import { Select } from "../../../components/Input/select";
import { BackButton } from "../../../components/BackButton";

const EditPersonalProfilePage: NextPage = () => {
    const { currentUser } = auth;

    const { isLoading, data:profile } = useQuery(["user-profile"], async () => {
        if(!currentUser) return;
        console.log(currentUser.uid)
        const data = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false)
        console.log(data);
        return data as User
    })


    const inputStyles: SxProps = {
        width: "100%",
        margin: "5px 0"
    }

    const submitForm = async (e:any) => {
        if(!currentUser) return;

        const data = new FormData(e.target);
        const entries = Object.fromEntries(data);

        await updateProfile(currentUser, {
            displayName: entries.name as string
        })

        try {
            await updateDocInFirestore(`users/${currentUser?.uid}`, entries)
        } catch (err) {
            //Display Toast
        }

    }
    return(
        <main>
            <BackButton/>
            <h3>Update Personal Information</h3>
            <form onSubmit={submitForm} className={styles.EditProfile}>
                <TextField
                    sx={inputStyles}
                    name="name"
                    label="Name"
                    defaultValue={currentUser?.displayName ?? " "}
                />
                <TextField
                    sx={inputStyles}
                    name="id_number"
                    label="ID Number"
                    defaultValue={profile?.student_id ?? " "}
                />
                <TextField
                    sx={inputStyles}
                    name="level"
                    label="Level"
                    defaultValue={profile?.level ?? " "}
                />
                <TextField
                    sx={inputStyles}
                    type="email"
                    name="email"
                    label="Email"
                    defaultValue={profile?.email ?? " "}
                />

                <Select
                    labelName="Department"
                    placeholder="eg. Computer Science"
                    name="department"
                    value={profile?.department ?? " "}
                >
                {
                    DEPARTMENTS.map((department) => (
                        <option key={department.id} value={department.name}>
                            {department.name}
                        </option>
                    ))
                }
                </Select>


                <Button>
                    Save Changes
                </Button>
            </form>
        </main>
    )
}

export default EditPersonalProfilePage;
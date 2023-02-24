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

const EditPersonalProfilePage: NextPage = () => {
    const { currentUser } = auth;

    const { isLoading, data:profile } = useQuery(["user-profile"], async () => {
        if(!currentUser) return;
        const data = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false)
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
            <h2>Update Personal Information</h2>
            <form className={styles.EditProfile}>
                <TextField
                    sx={inputStyles}
                    name="name"
                    label="Name"
                    value={currentUser?.displayName}
                />
                <TextField
                    sx={inputStyles}
                    name="id_number"
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

                <Select
                    labelName="Department"
                    placeholder="eg. Computer Science"
                    name="department"
                    value={profile?.department}
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
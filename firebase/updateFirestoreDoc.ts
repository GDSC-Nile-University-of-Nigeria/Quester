import { firestore } from "../environments/firebase.utils";
import { doc, updateDoc } from "firebase/firestore";

export const updateDocInFirestore = async(pathToDocument:string, newData:any): Promise<'success'|'failure'> => {
    try {
        const ref = doc(firestore, pathToDocument)
        await updateDoc(ref, newData)
        return "success"

    } catch(e) {
        console.error(e)
        return "failure"
    }

}

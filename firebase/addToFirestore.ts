import { firestore } from "../environments/firebase.utils";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

//This function adds a new document to firebase and the document is assigned a random Id
export const addNewDocument = async(pathToCollection:string, data:any):Promise<'success'|'failure'> => {
    try {
        const ref = collection(firestore, pathToCollection)
        await addDoc(ref, data)
        return "success"
    } catch (e) {
        console.error(e)
        return "failure"
    }
}

//This adds a new document but you get the chance to specify the Id yourself
export const addNewDocumentWithId = async(pathToCollection:string, docId: string, data:any):Promise<'success'|'failure'> => {
    try {
        const ref = doc(firestore, `${pathToCollection}/${docId}`)
        await setDoc(ref, data)
        return "success"
    } catch (e) {
        console.error(e)
        return "failure"
    }
}
import { storage } from "../environments/firebase.utils";
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";

//This function uploads a picture to cloud storage
export const uploadPicture = async (pathToPicture:string, base64String:string) => {
    try {
        const pictureRef = ref(storage, pathToPicture);
        const uploadResult = await uploadString(pictureRef, base64String, 'base64');
        const imageUrl = await getDownloadURL(uploadResult.ref);
        return imageUrl
    } catch (e) {
        console.error(e)
    }
}

//This function uploads a file to cloud storage
export const uploadFile = async (pathToFile:string, file:Blob) => {
    try {
        const fileRef = ref(storage, pathToFile);
        const uploadResult = await uploadBytes(fileRef, file)
        const fileUrl = await getDownloadURL(uploadResult.ref)
        return fileUrl
    } catch (e) {
        console.error(e)
    }
}
import { firestore } from "../environments/firebase.utils";
import { doc, getDocs, onSnapshot, getDoc, query, Query, collection } from "firebase/firestore";


//This gets a single document from Firestore
export const getDocumentFromFirestore = async (pathToDocument:string, realtimeUpdates:boolean = false) => {
    const ref = doc(firestore, pathToDocument);

    try {
        if(realtimeUpdates) {
            let document;
            onSnapshot(ref, {
                next: ((snapshot) => {
                    if(snapshot.exists())
                        document = snapshot.data();
                }),
                error: ((error) => {
                    console.error(error.code, error.message)
                })
            })
            return document;
        } else {
            const document = await getDoc(ref);
            return document;
        }

    } catch (e) {
        console.error(e, "Could not get document from Firestore")
    }
} 

//This gets all the documents in a collection
export const getDocumentsFromFirestore = async (query:Query, realtimeUpdates:boolean = false) => {
    const ref = query;
    
    try {

        if(realtimeUpdates) {
            let documents: any[] = [];
            onSnapshot(ref, {
                next: ((snapshot) => {
                    snapshot.forEach(doc => {
                        //Will refine this
                        documents = [...documents, doc.data()]
                    })
                }), 
                error: ((error) => {
                    console.error(error.code, error.message)
                })
            })
            return documents;
    
        } else {
            const documents = await getDocs(ref)
            return documents
        }
    
    } catch (e) {
        console.error(e)
    }

}
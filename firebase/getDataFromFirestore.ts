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
            return document.data();
        }

    } catch (e) {
        console.error(e, "Could not get document from Firestore")
    }
} 

//This gets all the documents in a collection
export const getDocumentsFromFirestore = async (query:Query, realtimeUpdates:boolean = false) => {
    const ref = query;
    
    try {
        let documents: any[] = [];

        if(realtimeUpdates) {
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
            return documents ?? []
            
        } else {
            
            const docs = await getDocs(ref)
            docs.forEach(doc => {
                documents = [...documents, doc.data()]
            })
        }
        
        return documents ?? [];
    } catch (e) {
        console.error(e)
    }

}
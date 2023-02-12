import { NextPage } from "next";
import { Input } from "../../components/Input";

import { MdCamera, MdFileUpload, MdImage } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { Tabs } from "../../components/Tabs";

import { getPhoto } from "../../helpers/getPhotoFromCamera";
import { addNewDocument, uploadFile, uploadPicture } from "../../firebase"; 
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { getFile } from "../../helpers/getPhotoFromFilesystem";
import { PastQuestion } from "../../types";

const AddQuestionPaper: NextPage = () => {
    const [pastQuestion, setPastQuestion] = useState<{
        data: any, source: 'camera'|'file'
    }|undefined>(undefined);


    const getFileFromInput = (e:any) => {
        const file = e.target.files[0]
        if(file.type !== 'application/pdf'){
            return
        }
        setPastQuestion({ data: file, source: 'file' })
        //uploadFile('files/test.pdf', e.target.files[0])


    }

    const captureImage = async () => {
        const imageData = await getPhoto()
        setPastQuestion({data: imageData.base64, source:'camera' })
    }

    const upload = async (e:any) => {
        e.preventDefault();
        if(!pastQuestion) return;
        
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data);
        const title = entries.title.toString().replaceAll(' ', '-')
        
        if(pastQuestion.source === 'camera'){
            const url = await uploadPicture(`images/${title}-${entries.year}`, pastQuestion.data)
            const data: PastQuestion = {
                department: entries.department as string,
                course: {
                    name: title,
                    level: entries.level as string
                },
                year: entries.year as string,
                image_url: url as string
            }
            
            const firestoreWrite = await addNewDocument('past-puestions', data)
            alert(firestoreWrite)


        } else if(pastQuestion.source === 'file') {
            const url = await uploadFile(`files/${title}-${entries.year}`, pastQuestion.data)
            const data: PastQuestion = {
                department: entries.department as string,
                course: {
                    name: title,
                    level: entries.level as string
                },
                year: entries.year as string,
                image_url: url as string
            }

            
            const firestoreWrite = await addNewDocument('past-puestions', data)
            alert(firestoreWrite)
        }
        //Change Alert to Something Better
    }
    return(
        <main>
            <form onSubmit={upload}>
                <h2>Upload</h2>
                <Input
                    labelName="Course Title"
                    placeholder="eg MAT 205"
                    name="title"
                />
                <Input
                    labelName="Year"
                    placeholder="2020"
                    name="year"
                />
                <Input
                    labelName="Department"
                    placeholder="eg. Computer Science"
                    name="department"
                />
                <Input
                    labelName="Level"
                    placeholder="What level is this course taken?"
                    name="department"
                />


                {
                    pastQuestion && pastQuestion.source === 'file' ? 
                    (<>
                        <h4>You have uploaded a file</h4>
                        <div className={styles.container}>
                            <FaFolder/>
                            <p>{pastQuestion.data?.name}</p>
                        </div>
                    </>) 
                    : pastQuestion && pastQuestion.source === 'camera' ?
                    <div className={styles.container}>
                        <MdImage/>
                        <p>You have uploaded an image</p>
                    </div>
                    : <p>You have not uploaded any file</p>
                }

                <div>
                    <span>
                        <MdCamera 
                            onClick={captureImage} 
                            size={30}
                        />
                    </span>
                    <input 
                        type="file" 
                        id="upload-file" 
                        hidden={true} 
                        title="File" 
                        onChange={getFileFromInput} 
                    />
                    <label htmlFor="upload-file">
                        <MdFileUpload size={30}/>
                    </label>
                </div>

                <button className={`${styles.button}`}>
                    Upload
                </button>
            </form>
            <Tabs/>
        </main>
    )
}

export default AddQuestionPaper;
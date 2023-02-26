import { NextPage } from "next";
import { Input } from "../../components/Input";

import { MdCamera, MdFileUpload, MdImage } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { Tabs } from "../../components/Tabs";

import { getPhoto } from "../../helpers/getPhotoFromCamera";
import { addNewDocument, uploadFile, uploadPicture } from "../../firebase"; 
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Level, PastQuestion } from "../../types";
import { Select } from "../../components/Input/select";
import { DEPARTMENTS } from "../../helpers/departments";
import { showToast } from "../../helpers/showToast";
import { BackButton } from "../../components/BackButton";
import { Toast } from "../../components/Toast";
import { AlertColor, IconButton } from "@mui/material";

interface FormState {
    isLoading: boolean;
    error?: unknown;
}
interface PastQuestionSubmission {
    data: any;
    source: 'camera'|'file';
}

const AddQuestionPaper: NextPage = () => {
    const [pastQuestion, setPastQuestion] = useState<PastQuestionSubmission|undefined>(undefined);
    const [formState, setFormState] = useState<FormState>({ isLoading: false, error: null });
    const [toast, setToast] = useState({ 
        isOpen: false, 
        message: '', 
        color: '', 
    })
    const formRef = useRef<HTMLFormElement>(null);

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
        if(!pastQuestion) return

        setFormState({ isLoading: true, error: null })
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data);
        const title = entries.title.toString().replaceAll(' ', '-')
        
        try {
            if(pastQuestion.source === 'camera'){
                const url = await uploadPicture(`images/${title}-${entries.type}-${entries.year}`, pastQuestion.data)
                const data: PastQuestion = {
                    department: entries.department as string,
                    course: {
                        name: title,
                        level: entries.level as Level
                    },
                    year: entries.year as string,
                    image_url: url as string,
                    type: entries.type as "Midterm"|"Final Exam"|"Quiz"
                }
                
                const firestoreWrite = await addNewDocument('past-questions', data)
                firestoreWrite === 'success' ? 
                setToast({ isOpen: true, message: "Successfully uploaded!", color: "success" }) : 
                setToast({ isOpen: true, message: "Failed to upload", color: "error" })
    
    
            } else if(pastQuestion.source === 'file') {
                const url = await uploadFile(`files/${title}-${entries.type}-${entries.year}`, pastQuestion.data)
                const data: PastQuestion = {
                    department: entries.department as string,
                    course: {
                        name: title,
                        level: entries.level as Level
                    },
                    year: entries.year as string,
                    image_url: url as string,
                    type: entries.type as "Midterm"|"Final Exam"|"Quiz"
                }
    
                
                const firestoreWrite = await addNewDocument('past-questions', data)
                firestoreWrite === 'success' ? 
                setToast({ isOpen: true, message: "Successfully uploaded!", color: "success" }) : 
                setToast({ isOpen: true, message: "Failed to upload", color: "error" })
            }
            //Change Alert to Something Better
            formRef.current?.reset()
        } catch (err) {
            setToast({isOpen: true, message: "Error while uploading document", color: "error"})
            setFormState({ isLoading: false, error: err })
        } finally {
            setFormState({ isLoading: false})
        }
    }
    return(
        <main>
            <BackButton/>
            <form ref={formRef} onSubmit={upload}>
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
                <Select
                    labelName="Department"
                    placeholder="eg. Computer Science"
                    name="department"
                >
                {
                    DEPARTMENTS.map((department) => (
                        <option key={department.id} value={department.name}>
                            {department.name}
                        </option>
                    ))
                }
                </Select>
                <Select
                    labelName="Level"
                    placeholder="What level is this course taken?"
                    name="level"
                >
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="600">600 Level</option>
                    <option value="Postgraduate">Postgraduate</option>
                </Select>

                <Select
                    labelName="Type"
                    placeholder="Midterm or Final Exam"
                    name="type"
                >
                    <option value="Midterm">Midterm</option>
                    <option value="Final Exam">Final Exam</option>
                </Select>


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
                    <IconButton onClick={captureImage}>
                        <MdCamera size={30}/>
                    </IconButton>
                    <input 
                        type="file" 
                        id="upload-file" 
                        hidden={true} 
                        title="File" 
                        onChange={getFileFromInput} 
                    />
                    <IconButton>
                        <label htmlFor="upload-file">
                            <MdFileUpload size={30}/>
                        </label>
                    </IconButton>
                </div>

                <button 
                    disabled={formState.isLoading}
                    className={styles.button}
                >
                    {formState.isLoading ? "..." : "Upload"}
                </button>

                <Toast
                    isOpen={toast.isOpen}
                    color={toast.color as AlertColor}
                    onClose={() => setToast({isOpen: false, color: "", message: ""})}
                    message={toast.message}
                />
            </form>
        </main>
    )
}

export default AddQuestionPaper;
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
        if(!pastQuestion) return

        const data = new FormData(e.target);
        const entries = Object.fromEntries(data);
        const title = entries.title.toString().replaceAll(' ', '-')
        
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
            firestoreWrite === 'success' ? showToast("Sucessfully added") : showToast("Failed to add")


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
            firestoreWrite === 'success' ? showToast("Sucessfully added") : showToast("Failed to add")
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
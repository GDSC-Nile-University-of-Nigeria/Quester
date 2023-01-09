import React from "react"
import styles from "./styles.module.scss";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    labelName: string
}

export const Input: React.FC<InputProps> = ({ labelName, className, ...props }) => {

    return(
        <div className={styles.inputContainer}>
            <label>{labelName}</label>
            <input className={`${className} ${styles.input}`} {...props}/>
        </div>
    )
}
import React from "react"
import styles from "./styles.module.scss";

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    labelName: string
}

export const Select: React.FC<SelectProps> = ({ labelName, className,children, ...props }) => {

    return(
        <div className={styles.inputContainer}>
            <label>{labelName}</label>
            <select className={`${className} ${styles.input}`} {...props}>
                { children }
            </select>
        </div>
    )
}
import { Alert, AlertColor, Snackbar } from "@mui/material"
import styles from "./styles.module.scss";
interface ToastProps {
    color?: AlertColor,
    isOpen: boolean,
    duration?: number,
    onClose: any,
    message: string
}

export const Toast: React.FC<ToastProps> = 
    ({ isOpen, duration, message, ...rest }) => {
        
        return(
            <Snackbar open={isOpen} onClose={rest.onClose} autoHideDuration={duration}>
                <Alert className={styles.toast} {...rest}>
                    {message}
                </Alert>
            </Snackbar>
        )

}

Toast.defaultProps = {
    duration: 3000,
    color: "info"
}
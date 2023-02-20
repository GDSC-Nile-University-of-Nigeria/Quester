import { Alert, AlertColor, Snackbar } from "@mui/material"

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
                <Alert {...rest}>
                    {message}
                </Alert>
            </Snackbar>
        )

}
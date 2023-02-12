interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return(
        <button>
            {children}
        </button>
    )
}
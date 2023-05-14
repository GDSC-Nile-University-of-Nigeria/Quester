import { InputBase } from "@mui/material"
import { FaSearch } from "react-icons/fa";
import styles from './styles.module.scss';

interface SearchbarProps {
    onChange?: React.ChangeEventHandler
}

export const Searchbar: React.FC<SearchbarProps> = ({ onChange }) => {
    return (
    <div className={styles.Searchbar}>
        <FaSearch/>
        <InputBase 
            sx={{ width: '100%' }}
            className={styles.SearchInput}
            onChange={onChange}
            placeholder="Search for a past question" 
            type="search"
        />
    </div>

    )
}
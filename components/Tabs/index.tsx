import { MdHome, MdDownload, MdAdd, MdMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

export const Tabs: React.FC = () => {
    const router = useRouter()
    

    return(
        <footer className={styles.footer}>
            <div className={styles.container}>

                <span 
                    className={styles.tab} 
                    title="Home"
                >
                   <Link href={'/dashboard/home'}>
                        <MdHome 
                            size={25}
                            className={`${router.pathname === '/home' ? styles.active: styles.inactive}`} 
                        />
                   </Link>
                </span>

                <span className={styles.tab} title="Downloads">
                    <MdDownload 
                        size={25}
                        className={`${router.pathname === '/dashboard/downloads' ? styles.active: null}`}
                    />
                </span>

                <span className={styles.tab}>
                    <button 
                        className={styles.addButton} 
                        title="Add"
                        onClick={() => router.push('/add')}
                    >
                        <MdAdd size={25} />
                    </button>
                </span>

                <span className={styles.tab}>
                    <FaUser 
                        size={25}
                        className={`${router.pathname === '/dashboard/profile' ? styles.active: null}`}
                    />
                </span>

                <span className={styles.tab}>
                    <MdMenu 
                        size={25}
                        className={`${router.pathname === '/dashboard/menu' ? styles.active: null}`}
                    />
                </span>
            </div>
        </footer>
    )
}
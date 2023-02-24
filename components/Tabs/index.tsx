import { MdHome, MdDownload, MdAdd, MdMenu, MdPerson } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

export const Tabs: React.FC = () => {
    const router = useRouter()
    

    return(
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>

                    <span 
                        className={styles.tab} 
                        title="Home"
                    >
                    <Link href={'/dashboard/home'}>
                            <MdHome 
                                size={30}
                                className={`${router.pathname === '/dashboard/home' ? styles.active: styles.inactive}`} 
                            />
                    </Link>
                    </span>

                    <span 
                        className={styles.tab} 
                        title="Downloads"
                    >
                        <Link href={'/dashboard/downloads'}>
                            <MdDownload 
                                size={30}
                                className={`${router.pathname === '/dashboard/downloads' ? styles.active: null}`}
                            />                        
                        </Link>
                    </span>

                    <span className={styles.tab}>
                        <Link href="/dashboard/profile">
                            <MdPerson 
                                size={30}
                                className={`${router.pathname === '/dashboard/profile' ? styles.active: null}`}
                            />
                        </Link>
                    </span>
                </div>
            </footer>

            <button 
                className={styles.addButton} 
                title="Add"
                onClick={() => router.push('/add')}
            >
                <MdAdd size={25} />
            </button>

        
        </>
    )
}
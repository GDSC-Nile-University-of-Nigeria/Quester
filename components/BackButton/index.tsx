import { useRouter } from "next/router"
import { MdArrowBack } from "react-icons/md"

export const BackButton: React.FC = () => {
    const router = useRouter();
    return (
        <span onClick={() => router.back()}>
            <MdArrowBack/>
        </span>
    )
}
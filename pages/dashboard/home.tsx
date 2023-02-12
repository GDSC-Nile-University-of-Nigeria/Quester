import { NextPage } from "next";
import { Tabs } from "../../components/Tabs";
import { auth } from "../../environments/firebase.utils";

const HomePage: NextPage = () => {
    const { currentUser } = auth;

    return(
        <main>
            <h1>Welcome, {currentUser?.displayName}</h1>

            <div>
                <h3>Recents</h3>
                
            </div>
            <Tabs/>
        </main>
    )
}

export default HomePage;
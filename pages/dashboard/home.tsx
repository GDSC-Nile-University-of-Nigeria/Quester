import { NextPage } from "next";
import { Tabs } from "../../components/Tabs";
import { auth, firestore } from "../../environments/firebase.utils";
import { Avatar, Button, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/Home.module.scss"
import { useContext, useEffect, useState } from "react";
import { useDebouce } from "../../hooks/useDebouce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDocumentFromFirestore, getDocumentsFromFirestore, updateDocInFirestore } from "../../firebase";
import { arrayUnion, collection, query, where } from "firebase/firestore";
import { PastQuestionsContext } from "../../contexts/PastQuestions";
import { MdDownload, MdFolder, MdNotifications } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { PastQuestion } from "../../types";
import Head from "next/head";
import { Searchbar } from "../../components/Searchbar";
import { Select } from "../../components/Input/select";
import { greetByTime } from "../../helpers/greetByTime";
import { BottomSheet } from "../../components/BottomSheet";
import { DEPARTMENTS } from "../../helpers/departments";
import Link from "next/link";

const HomePage: NextPage = () => {
    const { currentUser } = auth;
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [queryString, setQueryString] = useState("");
    //const { debouncedValue } = useDebouce(queryString);
    const ref = collection(firestore, "past-questions");
    const profileRef = collection(firestore, "users");

    const [filter, setFilter] = useState<{
        year?:string, department?:string, level?:string
    }>({ year: '', department: '', level: ''});


    const { isLoading, data } = useQuery(["recent-past-questions"], async () => {
        const data = await getDocumentsFromFirestore(ref, false)
        return data
    }, {
        onSuccess: (data) => {
            if(!data) return;
            //console.log(data)
        }
    })  
    const queryContraints = [
        !filter.year ? [] : where('year', '==', filter.year) ,
        !filter.department ? [] : where('department', '==', filter.department),
        !filter.level ? [] : where('course.level', '==', filter.level)
    ].flat();

    const { isLoading: loading, data: similar, mutateAsync } = useMutation(["similar"], async() => {
        if(!currentUser) return;
        const profile = await getDocumentFromFirestore(`users/${currentUser?.uid}`, false);
        const queryRef = query(ref, where('department', '==', profile?.department))
        const similarQuestions = await getDocumentsFromFirestore(queryRef) as any[];
        console.log(similarQuestions ?? [])
        return similarQuestions;
    })
    
    const { isLoading: filteredLoading, data: filteredResults, mutate } = useMutation({
        mutationKey: ["filtered-results", filter.year??"unset", filter.level??"unset", filter.department??"unset" ],
        mutationFn: async () => {
            const { year, department, level } = filter;
            if(!year && !level && !department) return
            
            const queryRef = query(ref, ...queryContraints)
            const data = await getDocumentsFromFirestore(queryRef, false) as any[]
            return data ?? []
        },
    })

    const addToDownloads = async (question: PastQuestion) => {
        try {
            await updateDocInFirestore(`users/${currentUser?.uid}`, {
                downloads: arrayUnion(question)
            })
        } catch (err) {
            //bring up toast
        }
    }

    
    
    return(
        <main>
            <Head>
                <title>Home</title>
            </Head>
            <div className={styles.Heading}>
                <IconButton onClick={() => setModalOpen(true)}>
                    <BsFilterLeft/>
                </IconButton>

                <div className="flex align-center">
                    <IconButton href="/dashboard/recently-added">
                        <MdNotifications/>
                    </IconButton>
                    <Link href="/dashboard/profile">
                        <IconButton>
                            <Avatar 
                                src={currentUser?.photoURL as string}
                                sx={{ width: 24, height: 24 }}
                            >
                                {currentUser?.displayName?.charAt(0)}
                            </Avatar>
                        </IconButton>
                    </Link>
                </div>
            </div>
            <h2 className={styles.Greeting}>
                {greetByTime()} {currentUser?.displayName?.split(' ')[0]}
            </h2>
            <Searchbar/>

            <div>
                <h3>Filtered Results</h3>
                <List
                    subheader={
                        <ListSubheader>
                            Press the filter icon at the top left
                        </ListSubheader>
                    }
                >
                    { isLoading ? <p>Loading...</p> : null }
                    {
                        !isLoading && data === undefined ? <p>No questions matching the criteria have been added yet</p>:
                        filteredResults?.map((question:PastQuestion) => (
                            <ListItem
                                disablePadding
                                key={`${question.course.name}-${question.year}`}
                                secondaryAction={
                                    <IconButton 
                                        onClick={() => addToDownloads(question)}
                                        target="_blank" 
                                        download={true} 
                                        href={question.image_url}
                                    >
                                        <MdDownload/>
                                    </IconButton>
                                }
                            >
                                <ListItemButton href={question.image_url} target="_blank">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MdFolder/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={question.course.name.replaceAll("-", " ") + " " + question?.type}
                                        secondary={question.year}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                              
            </div>
            <Tabs/>


            <BottomSheet isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h3>Filter Past Questions</h3>
                <Select
                    labelName="Year"
                    onChange={(e) => setFilter({ 
                        year: e.currentTarget.value, 
                        department: filter.department,
                        level: filter.level
                    })}
                >                   
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2024</option>
                </Select>

                <Select
                    labelName="Department"
                    onChange={(e) => setFilter({ 
                        department: e.currentTarget.value,
                        level: filter.level,
                        year: filter.year
                    })}
                >
                    {
                        DEPARTMENTS.map((department) => (
                            <option value={department.name}>
                                {department.name}
                            </option>
                        ))
                    }
                </Select>

                <Select
                    labelName="Level"
                    onChange={(e) => setFilter({ 
                        level: e.currentTarget.value,
                        year: filter.year,
                        department: filter.department
                    })}
                >
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="600">600 Level</option>
                    <option value="Postgraduate">Postgraduate</option>
                </Select>


                <Button onClick={() => {
                    mutate()
                    setModalOpen(false)
                }}>
                    Save Filters
                </Button>

            </BottomSheet>
        </main>
    )
}

export default HomePage;
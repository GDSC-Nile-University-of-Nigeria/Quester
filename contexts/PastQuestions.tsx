import { createContext } from "react";
import { PastQuestion } from "../types";
interface PastQuestionsContext {
    pastQuestions: PastQuestion[]
}

export const PastQuestionsContext = createContext<PastQuestionsContext>({
    pastQuestions: [],
})
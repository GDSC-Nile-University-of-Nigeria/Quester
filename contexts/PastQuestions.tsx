import { createContext } from "react";
import { PastQuestion } from "../types";
interface PastQuestionsContext {
    past_questions: PastQuestion[]
}

export const PastQuestionsContext = createContext<PastQuestionsContext>({
    past_questions: []
})
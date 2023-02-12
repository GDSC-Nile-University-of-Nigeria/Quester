import { PastQuestion } from "./PastQuestion";

export interface User {
    uid: string;
    name: string;
    department: string;
    student_id?: string;
    downloads?: PastQuestion[]
}
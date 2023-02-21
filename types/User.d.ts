import { Department } from "./Departments";
import { PastQuestion } from "./PastQuestion";

export interface User {
    uid: string;
    name: string;
    department: string;
    level: '100'|'200'|'300'|'400'|'500'|'600'|'Post Graduate'
    student_id?: string;
    email?: string;
    downloads?: PastQuestion[];
    recents?: PastQuestion[];
}
export interface PastQuestion {
    id: string;
    department: string;
    course: {
        code: string;
        name: string;
        level: string;
    },
    year: string;
}
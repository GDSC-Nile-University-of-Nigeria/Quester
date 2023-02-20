export interface PastQuestion {
    id?: string;
    department: string;
    course: {
        name: string;
        level: Level;
    },
    year: string;
    image_url: string;
    date_added?: string;
    type: "Midterm"|"Final Exam"|"Quiz"
}

export type Level = '100'|'200'|'300'|'400'|'500'|'600'|'Postgraduate'
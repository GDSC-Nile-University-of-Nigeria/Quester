export interface PastQuestion {
    id?: string;
    department: string;
    course: {
        name: string;
        level: Level;
    },
    year: string;
    image_url: string;
}

export type Level = '100'|'200'|'300'|'400'|'500'|'600'|'Postgraduate'
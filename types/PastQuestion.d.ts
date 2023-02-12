export interface PastQuestion {
    id?: string;
    department: string;
    course: {
        name: string;
        level: string;
    },
    year: string;
    image_url: string;
}
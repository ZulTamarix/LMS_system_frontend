import { Course_type } from "./course";
import { Question_type } from "./question";

export interface Assessment_type {
    id: number;
    asm_crs_id: number;
    asm_title: string;
    asm_totalQuestion: number;
    asm_timeLimit: number;
    asm_score: number;
    asm_status: 'active' | 'inactive';

    course?: Course_type,
    questions?: Question_type[]
}
import { User } from "./user";

export type DailyQuestion = {
  id: number;
  question: string;
  created_at: string; // ISO timestamp
};


export type GroupQuestionProgress = {
  group_id: number;
  current_question_number: number;
  is_answered: boolean | null;
  last_answered_at: string | null; // ISO timestamp
};

export type QuestionResponse = {
  group_id: number;
  user_id: number;
  question_number: number;
  response_text: string;
  mood_rating: number;
  created_at: string; // ISO timestamp
};


export type QuestionResponseWithUser = QuestionResponse & {
  users: User;
};
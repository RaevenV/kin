import { FamilyGroup, FamilyMember } from "./family";
import { DailyQuestion, GroupQuestionProgress, QuestionResponse } from "./question";
import { Topic } from "./topic";

export type Role = {
  id: number;
  role: string;
  created_at: string;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
  dob: string;
  role: number | null;
  level: number;
  xp: number;
  created_at: string;
};

export type UserWithRole = UserData & {
  role_name: Role;
};

export type Tables = {
  events: Event;
  daily_questions: DailyQuestion;
  topics: Topic;
  group_question_progress: GroupQuestionProgress;
  question_responses: QuestionResponse;
  family_members: FamilyMember;
  family_groups: FamilyGroup;
  users: UserData;
  role_name: Role;
};
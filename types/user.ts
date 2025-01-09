import { DailyQuestion, GroupQuestionProgress, QuestionResponse } from "./question";
import { Topic } from "./topic";

export type Role = {
  id: number;
  role: string;
  created_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  dob: string;
  role: number | null;
  created_at: string;
};

export type UserWithRole = User & {
  role_name: Role;
};

export type FamilyMember = {
  group_id: number;
  user_id: number;
  joined_at: string; // ISO timestamp
};

export type FamilyGroup = {
  id: number;
  name: string;
  invitation_code: string | null;
  created_by: number;
  reset_time: string;
  created_at: string;
  update_at: string | null;
};


export type FamilyGroupWithMembers = FamilyGroup & {
  family_members: FamilyMember[];
  users: User[];
};

export type Tables = {
  events: Event;
  daily_questions: DailyQuestion;
  topics: Topic;
  group_question_progress: GroupQuestionProgress;
  question_responses: QuestionResponse;
  family_members: FamilyMember;
  family_groups: FamilyGroup;
  users: User;
  role_name: Role;
};
import { UserData } from "./user";

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
  users: UserData[];
};
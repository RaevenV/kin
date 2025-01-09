export type Event = {
  id: number;
  group_id: number;
  title: string;
  description: string | null;
  start_time: string; // ISO timestamp
  end_time: string; // ISO timestamp
  created_by: number;
  event_type: string;
  created_at: string; // ISO timestamp
  updated_at: string | null; // ISO timestamp
};

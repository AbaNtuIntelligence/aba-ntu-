export interface Profile {
  id: string; // uuid
  email: string;
  full_name: string;
  created_at: string; // ISO timestamp
  updated_at: string;
  assessment_results?: Record<string, number>;
  assessment_score?: number;
  archetype?: string;
}
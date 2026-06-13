export type IVerdictType = "ПОДХОДИТ" | "ЧАСТИЧНО" | "НЕ ПОДХОДИТ";
export type IStatusType = "new" | "review" | "invited" | "rejected";
export type ICriteriaRating = "ok" | "partial" | "no";

export interface ICandidate {
  id: string;
  name: string;
  position: string;
  pos_label: string;
  file: string;
  email: string;
  phone: string;
  city: string;
  tg: string;
  exp: [string, string, string, string][]; 
  total_exp: string;
  stack: string;
  edu: string;
  verdict: IVerdictType;
  vc: string;
  criteria: [ICriteriaRating, string][]; 
  summary: string;
  questions: string[];
  status: IStatusType;
  createdAt: string;
}

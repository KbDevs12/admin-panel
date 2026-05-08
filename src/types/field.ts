export type FieldType = "futsal";

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  description?: string | null;
  price_per_hour: number;
  is_available: boolean;
  created_at: string;
}

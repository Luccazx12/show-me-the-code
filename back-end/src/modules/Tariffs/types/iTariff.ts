export interface ITariff {
  id: string;
  origin: number;
  destiny: number;
  coast_per_minute: number;
  activated: boolean;
  created_at: Date;
  updated_at: Date;
}

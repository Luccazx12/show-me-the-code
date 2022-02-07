export interface IPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  time_in_minutes: number;
  activated: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IPlan {
    id: string; //(uuid)
    name: string;
    description: string;
    time_in_minutes: number;
    price: number;
    image_url: string;
    activated: boolean;
    created_at: Date;
    updated_at: Date
}
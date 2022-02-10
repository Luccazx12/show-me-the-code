export type UserRequest = {
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  state?: number;
  city?: number;
  role_id?: string;
  avatar_url?: string;
  description?: string;
  plan_id?: string;
  activated?: boolean;
  // Utilizado só em alguns serviços
  // em estruturas de decisões.
  admin?: boolean;
  username_path?: string;
  role?: string;
};

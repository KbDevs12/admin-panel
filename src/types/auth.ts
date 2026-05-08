export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  inactivity_logout_days: number;
  user_id: string;
  email: string;
  role: "admin" | "superadmin";
}

export interface Session {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "superadmin";
  } | null;
}

export interface refreshResponse {
  access_token: string;
  inactivity_logout_days: number;
}

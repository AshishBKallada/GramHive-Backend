export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
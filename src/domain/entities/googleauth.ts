import { User } from "./user";

export interface GooglePayload {
    sub: string;
    email: string;
    name: string;
    picture: string;
}

export interface GoogleAuthResponse {
    user: User | null;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}
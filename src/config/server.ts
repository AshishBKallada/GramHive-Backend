import dotenv from 'dotenv';
dotenv.config()

export interface  ServerConfig {
    PORT: number;
    MONGODB:string;
    ORIGIN:string;
}

const config = <ServerConfig>{
    PORT:process.env.PORT || 3000,
    MONGODB:process.env.MONGODB || "",
    ORIGIN:process.env.ORIGIN

}

export default config;
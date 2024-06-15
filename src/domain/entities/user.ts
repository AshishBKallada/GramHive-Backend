export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface User {
    _id?:string;
    userId?: string;
    username: string;
    name: string;
    password?: string;
    email?: string;
    image?: string;
    bio?: string;
    website?: string;
    gender?: 'male' | 'female' | 'other';
    isBan?: boolean;
    location?: Location;
  }
  
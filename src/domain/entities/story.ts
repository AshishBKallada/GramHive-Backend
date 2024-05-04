export interface Story {
    _id: string;
    user: {
        _id: string;
    };
    story: string;
    createdAt: Date;
    seenBy?: any[]; 
}

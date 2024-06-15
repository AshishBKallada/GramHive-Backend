export interface Ad {
    user: string;
    title: string;
    images: AdImage[];
    rate: number;
    payment?: 'pending' | 'paid';
    status?: boolean;
}
export interface AdImage {
    caption: string;
    url: string;
    imageFile: string;
}
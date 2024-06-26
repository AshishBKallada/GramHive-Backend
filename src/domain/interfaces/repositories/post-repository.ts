import { PostData } from '../../entities/PostData';
import { User } from '../../entities/user';

export interface PostRepository {
    savePost(postId: string, userId: string): Promise<boolean>
    getHomePosts(userId: string, page: number, pageSize: number): Promise<PostData[] | null>
    deletePost(postId: string): Promise<boolean>
    addLike(postId: string, userId: string): Promise<any>
    removeLike(postId: string, userId: string): Promise<any>
    getLikes(postId: string): Promise<any[] | null>
    addPost(postData: PostData): Promise<boolean>;
    ReportPost(reportData: any): Promise<boolean>
    UpdatePost(postId: string, description: string, images: any, taggedPeople: any): Promise<boolean>
    unsavePost(postId: string, userId: string): Promise<boolean>
    findById(postId:string): Promise<PostData | null>
    getAllPosts(userId:string): Promise<PostData[]>
}
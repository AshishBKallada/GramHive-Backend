import { PostData } from '../../entities/PostData';

export interface PostRepository {
    savePost(postId: string, userId: string): Promise<boolean>
    getHomePosts(userId: string): Promise<PostData[] | null>
    deletePost(postId: string): Promise<boolean>
    addLike(postId: string, userId: string): Promise<boolean>
    removeLike(postId: string, userId: string): Promise<boolean>
    getLikes(postId: string): Promise<Like[] | null>
    addPost(postData: PostData): Promise<boolean>;
    ReportPost(reportData:any): Promise<boolean>
    UpdatePost(postId: string,description:string,images:any,taggedPeople:any): Promise<boolean>
    unsavePost(postId: string, userId: string): Promise<boolean>

    
    }
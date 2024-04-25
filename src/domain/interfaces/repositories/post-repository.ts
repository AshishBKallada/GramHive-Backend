import { PostData } from '../../entities/PostData';

export interface PostRepository{
    savePost(postId:string, userId:string) : Promise<boolean>
    getHomePosts(userId:string) : Promise<PostData[] | null>
    deletePost(postId:string) : Promise<boolean>
    addLike(postId: string,userId:string) : Promise<boolean>
    removeLike(postId: string,userId:string) : Promise<boolean>
    getLikes(postId: string): Promise<Like[] | null> 
    getProfilePosts(userId: string): Promise<PostData[] | null>;
    addPost(postData: PostData): Promise<boolean>;

}
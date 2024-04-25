import { PostData } from "../../entities/PostData";

export interface postInteractor{
    profilePosts(userId: string): Promise<PostData[] | null>;
    getHomePosts(userId:string) : Promise<PostData[] | null>
    savePost(postId:string, userId:string) : Promise<boolean>
    deletePost(postId:string) : Promise<boolean>
    addPost(data: PostData): Promise<boolean>;
    getLikes(postId: string): Promise<Like[] | null> 
    removeLike(postId: string,userId:string) : Promise<boolean>
    addLike(postId: string,userId:string) : Promise<boolean>

}
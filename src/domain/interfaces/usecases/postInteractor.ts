import { PostData } from "../../entities/PostData";

export interface postInteractor {
    getHomePosts(userId: string,page:number,pageSize:number): Promise<PostData[] | null>
    savePost(postId: string, userId: string): Promise<boolean>
    deletePost(postId: string): Promise<boolean>
    addPost(data: PostData): Promise<boolean>;
    getLikes(postId: string): Promise<Like[] | null>
    removeLike(postId: string, userId: string): Promise<boolean>
    addLike(postId: string, userId: string): Promise<boolean>
    reportPost(postId:string, author:string,userId:string): Promise<boolean>
    updatePost(postId: string,description:string, images: any,taggedPeople:any): Promise<boolean>
    unsavePost(postId: string, userId: string): Promise<boolean>
 
}
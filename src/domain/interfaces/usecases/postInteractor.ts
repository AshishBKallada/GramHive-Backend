import { PostData } from "../../entities/PostData";
import { User } from "../../entities/user";

export interface postInteractor {
    getHomePosts(userId: string,page:number,pageSize:number): Promise<PostData[] | null>
    savePost(postId: string, userId: string): Promise<boolean>
    deletePost(postId: string): Promise<boolean>
    addPost(data: PostData): Promise<boolean>;
    getLikes(postId: string): Promise<Like[] | null>
    removeLike(postId: string, userId: string): Promise<any>
    addLike(postId: string, userId: string): Promise<any>
    reportPost(postId:string, author:string,userId:string): Promise<boolean>
    updatePost(postId: string,description:string, images: any,taggedPeople:any): Promise<boolean>
    unsavePost(postId: string, userId: string): Promise<boolean>
    sharePost(senderId:string,postId:string,users:User[]): Promise<boolean>
 
}
import { postInteractor } from "../interfaces/usecases/postInteractor";
import { PostRepository } from "../interfaces/repositories/post-repository";
import { PostData } from "../entities/PostData";

export class postInteractorImpl implements postInteractor {

    constructor(private readonly Repository: PostRepository) { }

    async getHomePosts(userId: string): Promise<PostData[] | null> {
        console.log('2');
        try {
            const HomePosts = await this.Repository.getHomePosts(userId);
            return HomePosts;
        } catch (error) {
            console.error('Error fetching profile posts:', error);
            return null;
        }
    }
    async addPost(data: PostData): Promise<boolean> {
        console.log('2', data);

        try {
            const isPostAdded = await this.Repository.addPost(data);
            return isPostAdded;
        } catch (error) {
            console.error('Error adding post:', error);
            return false;
        }
    }

    async deletePost(postId: string): Promise<boolean> {
        try {
            const isPostDelete = await this.Repository.deletePost(postId);
            if (isPostDelete)
                return true;
            else
                return false;
        } catch (error) {
            console.error('Error fetching profile posts:', error);
            return false;
        }
    }

    async savePost(postId: string, userId: string): Promise<boolean> {
        try {
            const isSavePost = await this.Repository.savePost(postId, userId);
            if (isSavePost) {
                return true
            } else { return false }
        } catch (error) {
            console.error('Error saving post:', error);
            return false;
        }
    }
    async unsavePost(postId: string, userId: string): Promise<boolean> {
        try {
            const isSavePost = await this.Repository.unsavePost(postId, userId);
            if (isSavePost) {
                return true
            } else { return false }
        } catch (error) {
            console.error('Error unsaving post:', error);
            return false;
        }
    }


    async addLike(postId: string, userId: string): Promise<boolean> {
        try {
            const isLikeAdded = await this.Repository.addLike(postId, userId);

            return isLikeAdded;
        } catch (error) {
            console.error('Error getting comments:', error);
            return false;
        }
    }
    async removeLike(postId: string, userId: string): Promise<boolean> {
        try {
            const isLikeRemoved = await this.Repository.removeLike(postId, userId);

            return isLikeRemoved;
        } catch (error) {
            console.error('Error getting comments:', error);
            return false;
        }
    }

    async getLikes(postId: string): Promise<Like[] | null> {
        try {
            const likes = await this.Repository.getLikes(postId);
            return likes;
        } catch (error) {
            console.error('Error getting likes:', error);
            return null;
        }
    }

    async reportPost(postId: string, author: string, userId: string): Promise<boolean> {
        try {
            const reportData = {
                post: postId,
                author: author,
                userId: userId
            }
            console.log(reportData);

            const isPostReported = await this.Repository.ReportPost(reportData);
            if (isPostReported) {
                console.log('true');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error getting likes:', error);
            return false;
        }
    }
    async updatePost(postId: string,description:string, images: any, taggedPeople: any): Promise<boolean> {
        try {
            const isPostUpdated = await this.Repository.UpdatePost(postId,description, images, taggedPeople)
            return isPostUpdated ? true : false
        } catch (error) {
            console.error('Error getting likes:', error);
            return false;
        }
    }

}
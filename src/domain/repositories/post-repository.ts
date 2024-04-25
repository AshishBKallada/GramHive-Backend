import { PostRepository } from "../interfaces/repositories/post-repository";
import { PostData } from "../entities/PostData";
import postModel from "../../data/data-sources/mongodb/models/post";
import saveModel from "../../data/data-sources/mongodb/models/save";
import followModel from "../../data/data-sources/mongodb/models/followers";

export class PostRepositoryImpl implements PostRepository{
    async addPost(postData: PostData): Promise<boolean> {
        try {
            console.log('3', postData);

            const isPostAdded = await postModel.create(postData);
            console.log(isPostAdded);

            return isPostAdded ? true : false;
        } catch (error) {
            console.error('Error adding post:', error);
            return false;
        }
    }
  
    async addLike(postId: string, userId: string): Promise<boolean> {
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                console.error('Post not found');
                return false;
            }

            const newLike = {
                user: userId,
                post: postId,
            };

            post.likes.push(newLike);
            const isLikeAdded = await post.save();

            if (isLikeAdded) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error adding like:', error);
            return false;

        }
    }

    async removeLike(postId: string, userId: string): Promise<boolean> {
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                console.error('Post not found');
                return false;
            }

            const likeIndex = post.likes.findIndex((like) => like.user.toString() === userId)
            if (likeIndex !== 1) {
                post.likes.splice(likeIndex)
                const isLikeRemoved = await post.save();
                if (isLikeRemoved) {
                    return true;
                } else {
                    return false;
                }
            }


        } catch (error) {
            console.error('Error removing like:', error);
            return false;

        }
    }

    async getLikes(postId: string): Promise<likes[] | null> {
        try {
            console.log('444', postId);

            const post = await postModel.findById(postId)
            if (!post) {
                console.error('Post not found');
                return null;
            }
            console.log(post.likes);
            return post.likes;

        } catch (error) {
            console.error('Error getting likes:', error);
            return null;
        }
    }
    async getHomePosts(userId: string): Promise<PostData[] | null> {
        try {
            const users = await followModel.find({ followed_id: userId });
            const userIds = users.map(user => user.follower_id);
            console.log('2222', userIds);

            const posts = await postModel.find({ userId: { $in: userIds } }).populate('userId'); 

            console.log('POSTS', posts);
            return posts.length > 0 ? posts : null;
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return null;
        }
    }

    async deletePost(postId: string) : Promise<boolean>{
        try {
             const isPostDeleted = await postModel.findByIdAndDelete(postId);
             if(isPostDeleted) {
                return true;
             }else{
                return false;
             }
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return false;
        }
    }
    async savePost(postId:string,userId:string): Promise<boolean> {
        try {
            const ispostSaved = await saveModel.create({user:userId,post:postId});
            if(ispostSaved)
                {
                    return true
                }else{
                    return false;
                }
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return false;
        }
    }
}
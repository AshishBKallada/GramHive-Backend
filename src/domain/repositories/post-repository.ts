import { PostRepository } from "../interfaces/repositories/post-repository";
import { PostData } from "../entities/PostData";
import postModel from "../../data/data-sources/mongodb/models/post";
import saveModel from "../../data/data-sources/mongodb/models/save";
import followModel from "../../data/data-sources/mongodb/models/followers";
import reportModel from "../../data/data-sources/mongodb/models/report";

export class PostRepositoryImpl implements PostRepository {
    async addPost(postData: PostData): Promise<boolean> {
        try {

            const isPostAdded = await postModel.create(postData);

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

            const post = await postModel.findById(postId).populate('likes.user');
            if (!post) {
                console.error('Post not found');
                return null;
            }
            return post.likes;

        } catch (error) {
            console.error('Error getting likes:', error);
            return null;
        }
    }
    async getHomePosts(userId: string, page: number, pageSize: number): Promise<PostData[] | null> {
        try {
            const users = await followModel.find({ followed_id: userId });
            const userIds = users.map(user => user.follower_id);
            console.log('BIG LOG--------------',page,pageSize);
            

            const posts = await postModel.find({ $or: [{ userId: { $in: userIds } }, { userId: userId }] })
                .populate('userId')
                .populate('likes.user')
                .sort({ createdAt: -1 })
                .skip((page - 1) * 2)
                .limit(2);
                console.log('Post count',page,posts.length);
                

            const savedPosts = await saveModel.find({ user: userId }).select('post');
            const savedPostsData = savedPosts.map(savedPost => savedPost.post);

            if (posts && savedPostsData) {
                const savedPostIds = savedPostsData.map((objectId: any) => objectId.toString());
                posts.forEach(post => {

                    post.isSaved = savedPostIds.includes(post._id.toString());
                    if (post.isSaved) {
                        console.log('set');
                    }
                });
            }
            return posts ;
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return null;
        }
    }

    async deletePost(postId: string): Promise<boolean> {
        try {
            const isPostDeleted = await postModel.findByIdAndDelete(postId);
            if (isPostDeleted) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return false;
        }
    }
    async savePost(postId: string, userId: string): Promise<boolean> {
        try {
            const ispostSaved = await saveModel.create({ user: userId, post: postId });
            if (ispostSaved) {
                return true
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error retrieving posts:', error);
            return false;
        }
    }
    async unsavePost(postId: string, userId: string): Promise<boolean> {
        try {
            const ispostUnsaved = await saveModel.findOneAndDelete({ user: userId, post: postId });
            if (ispostUnsaved) {
                return true
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error unsaving post:', error);
            return false;
        }
    }

    async ReportPost(reportData: any): Promise<boolean> {
        try {
            const isPostReported = await reportModel.create(reportData)
            if (isPostReported) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error reporting post:', error);
            return false;
        }
    }
    async UpdatePost(postId: string, description: string, images: any, taggedPeople: any): Promise<boolean> {
        try {
            const post = await postModel.findById(postId)
            console.log('Post :', postId, description, images, taggedPeople);

            const isPostUpdated = await postModel.updateOne(
                { _id: postId },
                { $set: { caption: description, images: images, tags: taggedPeople } }
            );
            if (isPostUpdated) {
                console.log('Updated post:', isPostUpdated);

            }

            return isPostUpdated ? true : false;
        } catch (error) {
            console.error('Error reporting post:', error);
            return false;
        }
    }





}
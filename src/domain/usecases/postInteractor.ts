import { postInteractor } from "../interfaces/usecases/postInteractor";
import { PostRepository } from "../interfaces/repositories/post-repository";
import { PostData } from "../entities/PostData";
import { INotification } from "../entities/notifications";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";
import { getUserName } from "../../functions/getUserName";
import { User } from "../entities/user";
import { IChatRepository } from "../interfaces/repositories/chat-repository";
import { IMessageRepository } from "../interfaces/repositories/message-repository";

export class postInteractorImpl implements postInteractor {

    constructor(
        private readonly Repository: PostRepository,
        private readonly NotiRepository: INotificationRepository,
        private readonly chatRepository: IChatRepository,
        private readonly messageRepository: IMessageRepository
    ) { }

    async getHomePosts(userId: string, page: number, pageSize: number): Promise<PostData[] | null> {
        console.log('2');
        try {
            const HomePosts = await this.Repository.getHomePosts(userId, page, pageSize);
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


    async addLike(postId: string, userId: string): Promise<any> {
        try {
            const post = await this.Repository.addLike(postId, userId);

            const username = await getUserName(userId);

            const notification: INotification = {
                userId: post.userId,
                type: 'like',
                postId: postId,
                message: `${username} liked your post`,
                createdAt: new Date(),
                read: false
            };
            await this.NotiRepository.addNotification(notification);


            return { post, notification };
        } catch (error) {
            console.error('Error getting comments:', error);
            return false;
        }
    }
    async removeLike(postId: string, userId: string): Promise<any> {
        try {
            console.log('RMEOVE LIKE interactor ', postId, userId);

            const post = await this.Repository.removeLike(postId, userId);

            return post;
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
    async updatePost(postId: string, description: string, images: any, taggedPeople: any): Promise<boolean> {
        try {
            const isPostUpdated = await this.Repository.UpdatePost(postId, description, images, taggedPeople)
            return isPostUpdated ? true : false
        } catch (error) {
            console.error('Error getting likes:', error);
            return false;
        }
    }

    async sharePost(senderId: string, postId: string, users: User[]): Promise<boolean> {
        try {
            const post = await this.Repository.findById(postId);
            const userIds = users.map(user => user._id)


            for (const recipientId of userIds) {
                let chat = await this.chatRepository.findChatBetweenUsers(senderId, recipientId);

                if (!chat) {
                    chat = await this.chatRepository.createShareChat({
                        chatName: "sender",
                        isGroupChat: false,
                        users: [senderId, recipientId],
                    });
                }

                const newMessage = await this.messageRepository.createMessage({
                    sender: senderId,
                    chat: chat._id,
                    content: `Shared a post: ${post.caption}`,
                    sharedPost: postId,
                });

                await this.chatRepository.updateChatLatestMessage(chat._id, newMessage._id);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(userId:string): Promise<PostData[]> {
        try {
            const posts: PostData[] = await this.Repository.getAllPosts(userId);
            return posts;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            throw new Error('Failed to fetch posts');
        }
    }



}
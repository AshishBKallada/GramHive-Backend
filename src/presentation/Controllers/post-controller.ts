import { User } from "../../domain/entities/user";
import { postInteractor } from "../../domain/interfaces/usecases/postInteractor";
import { Request, Response, NextFunction } from "express";
export class PostController {

    constructor(private readonly interactor: postInteractor) { }

    async getHomePosts(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const userId = req.params.userId;

            const posts = await this.interactor.getHomePosts(userId, page, pageSize);

            if (posts) {

                res.status(200).json({ success: true, message: 'Retreived posts  successfully.', posts });
            } else {
                res.status(400).json({ success: false, message: 'Failed to retreive posts .' });
            }

        } catch (error) {
            console.error('Error retreiving posts', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async addLike(req: Request, res: Response) {
        try {
            const postId: string = req.params.postId;
            const userId = req.body.userId;

            const { post, notification } = await this.interactor.addLike(postId, userId);

            if (post) {
                const likes = post.likes;
                console.log('CONTROLLER,', notification);


                return res.status(200).json({ success: true, likes, notification });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to get comments' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async removeLike(req: Request, res: Response) {
        try {

            const postId: string = req.params.postId;
            const userId = req.body.userId;
            const post = await this.interactor.removeLike(postId, userId);

            if (post) {

                return res.status(200).json({ success: true, post });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to unlike the post' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getLikes(req: Request, res: Response) {
        try {
            const postId: string = req.params.postId;

            const likes = await this.interactor.getLikes(postId);

            if (likes) {

                return res.status(200).json({ success: true, likes });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to get likes' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }


    async  deletePost(req: Request, res: Response) {
        try {

            const postId: string = req.params.postId;
            const isPostDelete = await this.interactor.deletePost(postId);

            if (isPostDelete) {

                return res.status(200).json({ success: true, message: 'Deleted the post Successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to delete the post' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async savePost(req: Request, res: Response) {
        try {

            const postId: string = req.params.postId;
            const userId: string = req.params.author;
            const isSavePost = await this.interactor.savePost(postId, userId);

            if (isSavePost) {
                return res.status(200).json({ success: true, message: 'Saved the post Successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to save the post' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    async onUnsavePost(req: Request, res: Response) {
        try {

            const postId: string = req.params.postId;
            const userId: string = req.params.author;
            const isUnSavePost = await this.interactor.unsavePost(postId, userId);

            if (isUnSavePost) {
                return res.status(200).json({ success: true, message: 'Saved the post Successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to save the post' });
            }
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async addPost(req: Request, res: Response, next: NextFunction) {

        const { caption, urls, tags, isChecked } = req.body;
        const userId = req.user._id;
        const images = urls;

        try {
            const isPostAdded = await this.interactor.addPost({ caption, images, tags, isChecked, userId });

            if (isPostAdded) {
                res.status(200).json({ message: 'Images uploaded successfully', success: true });
            } else {
                res.status(404).json({ message: 'Failed to upload image', success: false });
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            res.status(500).json({ message: 'An error occurred while uploading images', success: false });
        }
    }

    async onReportPost(req: Request, res: Response) {
        const postId = req.params.postId;
        const { author, userId } = req.body;

        try {
            const isPostReported = await this.interactor.reportPost(postId, author, userId)
            if (isPostReported) {

                return res.status(200).json({ message: 'Post was successfulyy reported', success: true });
            } else {
                return res.status(404).json({ message: 'Failed to report post', success: false });
            }
        } catch (error) {
            console.error('Error reporting post:', error);
            res.status(500).json({ message: 'An error occurred while reporting post', success: false });
        }
    }

    async onPostUpdate(req: Request, res: Response) {
        try {
            const postId = req.params.postId;

            const { description, images, taggedPeople } = req.body;
            console.log('Controller', description);

            const ispostUpdated = await this.interactor.updatePost(postId, description, images, taggedPeople);
            if (ispostUpdated) {
                console.log('POST UPDATED');

                return res.status(200).json({ message: 'Post updated successfully', success: true })
            } else {
                return res.status(404).json({ message: 'Failed to update post', success: false });
            }
        } catch (error) {
            res.status(404).json({ message: 'An error occurred while reporting post', success: false });
        }
    }

    async onSharePost(req: Request, res: Response) {
        try {
            const senderId: string = req.user._id;
            const postId: string = req.params.postId;
            const users: User[] = req.body.users;

            console.log('Controller', senderId, postId, users);

            const success = await this.interactor.sharePost(senderId, postId, users);
            if (success) {
                res.status(200).json({ message: "Post shared successfully", success });
            } else {
                res.status(500).json({ message: "Failed to share post", success });
            }
        } catch (error) {
            res.status(500).json({ message: "An error occurred", error: error.message });

        }
    }

    async onAllPost(req: Request, res: Response) {
        try {
            const userId = req.user._id;
            const posts = await this.interactor.getAllPosts(userId);            
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: "An error occurred", error: error.message });

        }

    }
}

import { postInteractor } from "../../domain/interfaces/usecases/postInteractor";
import { Request,Response,NextFunction } from "express";
export class PostController{

    constructor(private readonly interactor: postInteractor){}

async getHomePosts(req: Request, res: Response){
    try {
        console.log('1');

        const userId = req.params.userId;
        console.log('userId', userId);

        const posts = await this.interactor.getHomePosts(userId);

        if (posts) {
               console.log('OUTER POSTS', posts);
               
            res.status(200).json({ success: true, message: 'Retreived posts  successfully.', posts });
        } else {
            res.status(400).json({ success: false, message: 'Failed to retreive posts .' });
        }

    } catch (error) {
        console.error('Error retreiving posts', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

async addLike(req: Request, res: Response){
    try {
        const postId: string = req.params.postId;
        const author = req.body.author;
        const userId = author
        const isLikeAdded = await this.interactor.addLike(postId, userId);

        if (isLikeAdded) {

            return res.status(200).json({ success: true, message: 'Liked the post Successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Failed to get comments' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async removeLike(req: Request, res: Response){
    try {
        const postId: string = req.params.postId;
        const author = req.body.author;
        const userId = author
        const isLikeRemoved = await this.interactor.removeLike(postId, userId);

        if (isLikeRemoved) {

            return res.status(200).json({ success: true, message: 'Unliked the post Successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Failed to unlike the post' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async getLikes(req: Request, res: Response){
    try {
        const postId: string = req.params.postId;
        console.log('1', postId);

        const likes = await this.interactor.getLikes(postId);

        if (likes) {
            console.log('LIKES', likes);

            return res.status(200).json({ success: true, likes });
        } else {
            return res.status(404).json({ success: false, message: 'Failed to get likes' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


async deletePost(req: Request, res: Response){
    try {
        console.log('111111111111111111');
        
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

async savePost(req: Request, res: Response){
    try {
        console.log('111111111111111111');
        
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

async addPost(req: Request, res: Response, next: NextFunction){
    console.log('1');

    const { caption, cloudinaryUrls, tags, isChecked } = req.body;
    const userId = req.params.userId;
    const images = cloudinaryUrls;

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
}

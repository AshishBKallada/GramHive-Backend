import { Request,Response,NextFunction } from "express";
import { profileInteractor } from "../../domain/interfaces/usecases/profileInteractor";

export class profileController{

    constructor(private readonly interactor: profileInteractor) { }

async updateProfile(req: Request, res: Response, next: NextFunction){
    console.log('1234567890------------------------------------------', req.body);
    const { userId, username, name, website, bio, cloudinaryUrl, gender } = req.body;
    const image = cloudinaryUrl[0];

    try {
        const updatedUser = await this.interactor.updateProfile({ userId, username, name, website, bio, image, gender });
        if (updatedUser) {
            res.status(200).json({ message: 'Profile update successful',updatedUser });
        } else {
            res.status(401).json({ message: 'Failed to update profile' });
        }
    } catch (e) {
        console.error('Error during profile updation:', e);
        res.status(500).send('Internal server error');
    }
}

async profilePosts(req: Request, res: Response){
    try {
        console.log('1');

        const userId = req.params.userId;
        console.log('userId', userId);

        const posts = await this.interactor.profilePosts(userId);

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

async followUser(req: Request, res: Response){
    try {
        const { follower_id, followed_id } = req.body;
        console.log(follower_id, followed_id);
        const success = await this.interactor.followUser({ follower_id, followed_id })
        if (success) {
            console.log('aahd mwone true aaytnd');

            return res.status(200).json({ success: true, message: 'User was followed successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Failed to follow the user' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

async unfollowUser(req: Request, res: Response){
    try {
        const { follower_id, followed_id } = req.body;
        console.log(follower_id, followed_id);
        const success = await this.interactor.unfollowuser({ follower_id, followed_id })
        if (success) {
            console.log('aahd mwone avne unfollow akktnd');

            return res.status(200).json({ success: true, message: 'User was followed successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Failed to follow the user' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
}
}

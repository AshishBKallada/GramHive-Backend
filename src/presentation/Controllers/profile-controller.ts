import { Request, Response, NextFunction } from "express";
import { profileInteractor } from "../../domain/interfaces/usecases/profileInteractor";

export class profileController {

    constructor(private readonly interactor: profileInteractor) { }

    async updateProfile(req: Request, res: Response, next: NextFunction) {
        const { userId, username, name, website, bio, cloudinaryUrl, gender } = req.body;
        const image = cloudinaryUrl[0];

        try {
            const updatedUser = await this.interactor.updateProfile({ userId, username, name, website, bio, image, gender });
            if (updatedUser) {
                res.status(200).json({ message: 'Profile update successful', updatedUser });
            } else {
                res.status(401).json({ message: 'Failed to update profile' });
            }
        } catch (e) {
            console.error('Error during profile updation:', e);
            res.status(500).send('Internal server error');
        }
    }

    async onGetProfileData(req: Request, res: Response) {
        try {

            const userId = req.params.userId;


            const { posts, followers, following } = await this.interactor.getProfileData(userId);

            if (posts && followers && following) {

                res.status(200).json({ success: true, message: 'Retreived profileData  successfully.', posts, followers, following });
            } else {
                res.status(400).json({ success: false, message: 'Failed to retreive profileData .' });
            }

        } catch (error) {
            console.error('Error retreiving posts', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async followUser(req: Request, res: Response) {
        try {
            const { follower_id, followed_id } = req.body;
            const notification = await this.interactor.followUser({ follower_id, followed_id })
            if (notification) {

                return res.status(200).json({ success: true, message: 'User was followed successfully', notification });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to follow the user' });
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });

        }
    }

    async unfollowUser(req: Request, res: Response) {
        try {
            const { follower_id, followed_id } = req.body;
            const success = await this.interactor.unfollowUser({ follower_id, followed_id })
            if (success) {
                console.log('aahd mwone avne unfollow akktnd');

                return res.status(200).json({ success: true, message: 'User was unfollowed successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to unfollow the user' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    async onGetFollowers(req: Request, res: Response) {
        try {
            const userId = req.params.userId;

            const followers = await this.interactor.getFollowers(userId)
            if (followers) {
                console.log('Followers:', followers);
                return res.status(200).json({ success: true, message: 'Retreieved followers successfully', followers: followers });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to retreive followers' });
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async onGetFollowing(req: Request, res: Response) {
        try {
            const userId = req.params.userId;

            const following = await this.interactor.getFollowing(userId)
            if (following) {
                return res.status(200).json({ success: true, message: 'Retreieved following successfully', following: following });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to retreive following' });
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async onRemoveFollower(req: Request, res: Response) {
        try {
            const { follower_id, followed_id } = req.body;
            const isFollowerRemoved = await this.interactor.RemoveFollower({ follower_id, followed_id })
            if (isFollowerRemoved) {
                return res.status(200).json({ success: true, message: 'Removed user successfully', });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to remove user' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });

        }
    }
    async onGetSaved(req: Request, res: Response) {
        try {

            const userId = req.params.userId;
            const posts = await this.interactor.getSaved(userId)

            if (posts) {
                return res.status(200).json({ success: true, message: 'retreived saved posts successfully', posts });
            } else {
                return res.status(404).json({ success: false, message: 'Failed to retreive saved posts' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

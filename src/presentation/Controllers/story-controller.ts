import { storyInteractor } from "../../domain/interfaces/usecases/storyInteractor";
import { Request, Response, NextFunction } from "express";

export class storyController {
    constructor(public readonly interactor: storyInteractor) { }

    async addStory(req: Request, res: Response) {
        const userId = req.params.userId;
        const storyFile = req.file;

        if (!storyFile) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }
        try {
            const isStoryUploaded = await this.interactor.uploadStory(userId, storyFile)
            if (isStoryUploaded) {
                return res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, error: 'Failed to upload story' })
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async onGetStories(req: Request, res: Response) {
        try {
            const userId = req.params.userId
            const stories = await this.interactor.getStories(userId)

            return res.status(200).json({ success: true, message: 'retreived stories successfully', stories });
        } catch (error) {
            console.error('Error retreiving stories:', error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async onUpdateViews(req: Request, res: Response) {
        try {
            const { userId, viewer } = req.body;
            const success = await this.interactor.updateView(userId, viewer);
    
            if (success) {
                return res.status(200).json({ success: true, message: 'Updated story view successfully' });
            } else {
                return res.status(400).json({ success: false, message: 'Failed to update story view' });
            }
        } catch (error) {
            console.error('Error updating story view:', error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
    

}
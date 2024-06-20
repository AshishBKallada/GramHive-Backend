import { Request, Response } from "express";
import { IReportInteractor } from "../../domain/interfaces/usecases/IReportInteractor";

export class ReportController {
    constructor(private readonly interactor: IReportInteractor) { }

    async onReportContent(req: Request, res: Response) {
        const user = req.user?._id;
        const { content } = req.body;

        if (!user) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        try {
            const success = await this.interactor.reportContent(user, content);
            return res.status(200).json({ success });
        } catch (error) {
            console.error('Error reporting content:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async onReportUser(req: Request, res: Response): Promise<Response> {
        const user: string = req.user?._id;
        const reportedUser: string = req.params.Id;
        const { category, reason } = req.body;

        if (!user) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        if (!reportedUser) {
            return res.status(400).json({ error: 'Reported user is required' });
        }

        try {
            const success = await this.interactor.reportUser(user, reportedUser, category, reason);
            return res.status(success ? 200 : 201).json({ success });
        } catch (error) {
            console.error('Error in onReportUser:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async onReportPost(req: Request, res: Response) {
        const user = req.user?._id;
        const postId = req.params.Id;
        const { category, reason } = req.body;

        if (!user) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        if (!postId) {
            return res.status(400).json({ error: 'PostId is required' });
        }

        try {
            const success = await this.interactor.reportPost(user, postId, category, reason);
            return res.status(success ? 200 : 201).json({ success });
        } catch (error) {
            console.error('Error in onReportPost:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async onReportFeedback(req: Request, res: Response): Promise<Response> {
        const { postId, reason } = req.body;

        try {
            const feedbackResult = await this.interactor.reportFeedback(postId, reason);
            if (typeof feedbackResult === 'boolean' && feedbackResult) {
                return res.status(201).json({ success: true });
            } else if (typeof feedbackResult === 'object' && feedbackResult.message) {
                return res.status(203).json({ message: feedbackResult.message });
            } else {
                throw new Error('Unexpected response from reportFeedback');
            }
        } catch (error) {
            console.error('Error in onReportFeedback:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

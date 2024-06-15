import { Schema } from "mongoose";
import { IReportRepository } from "../interfaces/repositories/report-repository";
import { IReportInteractor } from "../interfaces/usecases/reportInteractor";

export class ReportInteractorImpl implements IReportInteractor {
    constructor(private readonly Repository: IReportRepository) { }

    async reportContent(user: string, content: string): Promise<boolean> {
        console.log('222');

        if (!user) {
            throw new Error('User is required');
        }

        if (!content) {
            throw new Error('Valid content is required');
        }

        try {
            await this.Repository.saveReportContent(user, content);
            return true;
        } catch (error) {
            console.error('Error reporting content:', error);
            throw new Error('Internal server error');
        }
    }

    async reportUser(user: string, reportedUser: string, category: string, reason: string): Promise<boolean> {
        if (!user) {
            throw new Error('User is required');
        }

        if (!reportedUser) {
            throw new Error('Reported User is required');
        }

        try {
            const isAlreadyReported = await this.Repository.isUserReported(user, reportedUser);
            if (!isAlreadyReported) {
                return await this.Repository.saveReportUser(user, reportedUser, category, reason);
            } else {
                console.warn('User has already reported this user.');
                return false;
            }
        } catch (error) {
            console.error('Error reporting user:', error);
            throw new Error('Internal server error');
        }
    }
    async reportPost(user: string, post: string, category: string, reason: string): Promise<boolean> {

        try {
            const isAlreadyReported = await this.Repository.isPostReported(user, post);
            if (!isAlreadyReported) {
                console.log('2.1');

                return await this.Repository.saveReportPost(user, post, category, reason);

            } else {
                console.log('2.2');
                console.warn('User has already reported this post.');
                return false;
            }
        } catch (error) {
            console.error('Error reporting post:', error);
            throw new Error('Internal server error');
        }
    }

    async reportFeedback(postId: string, reason: string): Promise<boolean | { message: string }> {
        try {
            const isFeedbackAlreadyAdded = await this.Repository.checkIfFeedbackExists(postId);
            if (isFeedbackAlreadyAdded) {
                return { message: 'Feedback already submitted for this post' };
            }

            const success = await this.Repository.AddreportFeedback(postId, reason);
            return success;
        } catch (error) {
            console.error('Error reporting post:', error);
            throw new Error('Internal server error');
        }
    }




}
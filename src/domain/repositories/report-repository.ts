import { IReportRepository } from "../interfaces/repositories/report-repository";
import ReportModel from "../../data/data-sources/mongodb/models/report";
import postModel from "../../data/data-sources/mongodb/models/post";
import ReportFeedbackModel from "../../data/data-sources/mongodb/models/reportfeedbacks";
import mongoose from "mongoose";

export class ReportReporsitoryImpl implements IReportRepository {
    async saveReportContent(user: string, content: string): Promise<boolean> {
        console.log('333');

        try {
            await ReportModel.create({ author: user, type: 'content', content: content });
            return true;
        } catch (error) {
            console.error('Error saving report content:', error);
            throw new Error('Failed to save report content');
        }
    }

    async isUserReported(user: string, reportedUser: string): Promise<boolean> {
        try {
            const report = await ReportModel.findOne({
                author: user,
                type: 'user',
                reportedUser: reportedUser
            });
            return report !== null;
        } catch (error) {
            console.error('Error checking if user is already reported:', error);
            throw new Error('Internal server error');
        }
    }
    async saveReportUser(user: string, reportedUser: string, category: string, reason: string): Promise<boolean> {
        try {
            const existingReport = await ReportModel.findOne({ type: 'user', reportedUser: reportedUser });

            if (existingReport) {
                existingReport.users.push({ author: user, category, reason });
                await existingReport.save();
            } else {
                await ReportModel.create({
                    type: 'user',
                    reportedUser: reportedUser,
                    users: [{ author: user, category, reason }]
                });
            }
            return true;
        } catch (error) {
            console.error('Error saving report user:', error);
            throw new Error('Failed to save report user');
        }
    }



    async isPostReported(user: string, post: string): Promise<boolean> {
        try {
            console.log('repo1 ');

            const report = await ReportModel.findOne({
                author: user,
                type: 'post',
                reportedPost: post
            });
            return report !== null;
        } catch (error) {
            console.error('Error checking if post is already reported:', error);
            throw new Error('Internal server error');
        }
    }

    async saveReportPost(user: string, post: string, category: string, reason: string): Promise<boolean> {
        try {
            const existingReport = await ReportModel.findOne({ type: 'post', reportedPost: post });

            if (existingReport) {
                if (!existingReport.users) {
                    existingReport.users = [];
                }

                existingReport.users.push({ author: user, category, reason });
                await existingReport.save();

                if (existingReport.users.length >= 3) {
                    await postModel.findByIdAndUpdate(post, { $set: { isBan: true } }, { upsert: true });
                }
            } else {
                const newReport = await ReportModel.create({
                    type: 'post',
                    reportedPost: post,
                    users: [{ author: user, category, reason }]
                });

                if (newReport.users.length >= 3) {
                    await postModel.findByIdAndUpdate(post, { $set: { isBan: true } }, { upsert: true });
                }
            }

            return true;
        } catch (error) {
            console.error('Error saving report on post:', error);
            throw new Error('Failed to save report on post');
        }
    }

    async checkIfFeedbackExists(postId: string): Promise<boolean> {
        try {
            console.log('reason', postId);

            const isfbAlreadyAdded = await ReportModel.find({
                response: { $ne: null },
            });
            if (isfbAlreadyAdded.length > 0) {
                console.log('yes ');

                return true;
            } else {
                console.log('no ');

                return false;
            }
        } catch (error) {
            console.error('Error checking if feedback was already submitted:', error);
            throw new Error('Error checking if feedback was already submitted');
        }
    }

    async AddreportFeedback(postId: string, reason: string): Promise<boolean> {
        try {
            const report = await ReportModel.findOneAndUpdate(
                { reportedPost: postId },
                { response: reason },
                { new: true }
            );
            if (report) {
                console.log('success');

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error saving report on post:', error);
            throw new Error('Failed to save report on post');
        }
    }






}
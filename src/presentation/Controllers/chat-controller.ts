import { IChatInteractor } from "../../domain/interfaces/usecases/chatInteractor";
import { Request, Response } from "express";

export class chatController {
    constructor(private readonly interactor: IChatInteractor) { }

    async accessChat(req: Request, res: Response) {
        try {
            console.log('1');
            
            const userId = req.params.userId;

            const currUser = req.user._id;
            console.log(currUser, 'current user');

            const result = await this.interactor.accessChat(userId, currUser);
            res.json(result);
        } catch (error) {
            console.error('Error accessing chat:', error);
            res.status(500).json({ message: 'Error accessing chat' });
        }
    }

    async fetchChat(req: Request, res: Response) {
        try {
            console.log('111', req.user);

            const userId = req.user._id;
            console.log(userId);

            const chats = await this.interactor.fetchChat(userId);
            
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ message: 'Error accessing chat' });

        }
    }

    async createGroup(req: Request, res: Response) {
        try {
            console.log('11');

            var { groupName, users } = req.body;

            const adminId = req.user._id;
            console.log('groupName', groupName, users);


            const groupCreated = await this.interactor.createGroup(groupName, users, adminId);
            return res.status(200).json(groupCreated);
        } catch (error) {
            console.log('Error creating group:', error);
            return res.status(500).json({ message: 'Failed to create group' });

        }
    }

    async renameGroup(req: Request, res: Response) {
        try {
            const { groupId, newName } = req.body;
            const isGroupNameUpdated = await this.interactor.renameGroup(groupId, newName);
            return res.status(200).json(isGroupNameUpdated);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to rename group' });

        }
    }

    async addToGroup(req: Request, res: Response) {
        try {

            const { users } = req.body;
            const groupId = req.params.groupId;
            const UpdatedGroup = await this.interactor.addToGroup(groupId, users);
            return res.status(200).json(UpdatedGroup);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to add to group' });
        }
    }

    async removeFromGroup(req: Request, res: Response) {
        try {
            const { users } = req.body;
            const groupId = req.params.groupId;
            const UpdatedGroup = await this.interactor.removeFromGroup(groupId, users);
            return res.status(200).json(UpdatedGroup);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to add to group' });

        }
    }
    async deleteGroup(req: Request, res: Response) {
        try {
            const groupId = req.params.groupId;
            const isGroupDeleted = await this.interactor.deleteGroup(groupId);
            return res.status(200).json({success:true});

        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete group' });

        }
    }

}
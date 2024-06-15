import { Request, Response } from "express";
import { INoteInteractor } from "../../domain/interfaces/usecases/noteInteractor";

export class NoteController {
    constructor(private readonly interactor: INoteInteractor) { }
    async onAddNote(req: Request, res: Response) {
        const userId: string = req.user._id;
        const note: string = req.body.note;
        try {
            const success = await this.interactor.addNote(userId, note);
            res.status(201).json({ message: 'Note added successfully!', success });
        } catch (error) {
            console.error('Error adding note:', error);
            res.status(500).json({ message: 'Failed to add note' });
        }
    }

    async onGetNote(req: Request, res: Response) {
        const userId: string = req.user._id;
        try {
            const note = await this.interactor.getNote(userId);
            res.status(200).json(note);
        } catch (error) {
            console.error('Error adding note:', error);
            res.status(500).json({ message: 'Failed to add note' });
        }
    }

    async onRemoveNote(req: Request, res: Response) {
        const userId: string = req.user._id;
        try {
            const success = await this.interactor.removeNote(userId);
            res.status(200).json(success);
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({ message: 'Failed to delete note' });
        }
    }

    async onGetNotes(req: Request, res: Response) {
        const userId: string = req.user._id;
        try {
            const notes = await this.interactor.getNotes(userId);
            res.status(200).json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ message: 'Failed to fetch notes' });
        }
    }

    async onAddReply(req: Request, res: Response) {
        const userId: string = req.user._id;
        const noteId: string = req.body.noteId;
        const reply: string = req.body.reply;

        try {
            const success = await this.interactor.addReply(noteId, userId, reply);            
            res.status(201).json({ message: 'Reply added successfully!', success });
        } catch (error) {
            console.error('Error adding note:', error);
            res.status(500).json({ message: 'Failed to add reply' });
        }
    }




}
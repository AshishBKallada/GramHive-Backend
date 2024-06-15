import { Note } from "../entities/note";
import { INoteRepository } from "../interfaces/repositories/note-repository";
import { INoteInteractor } from "../interfaces/usecases/noteInteractor";

export class NoteInteractorImpl implements INoteInteractor {
    constructor(private readonly repository: INoteRepository) { }

    async addNote(userId: string, note: string): Promise<boolean> {
        try {
            const Note: Note = {
                userId: userId,
                note: note
            }
            const success = await this.repository.saveNote(Note);
            return success;
        } catch (error) {
            throw error;
        }
    }

    async getNote(userId: string): Promise<Note | null> {
        try {
            const note = await this.repository.fetchNote(userId);
            return note;
        } catch (error) {
            throw error;
        }
    }

    async removeNote(userId: string): Promise<boolean> {
        try {
            const success = await this.repository.removeNote(userId);
            return success;
        } catch (error) {
            throw error;
        }
    }

    async getNotes(userId: string): Promise<Note[] | null> {
        try {
            const notes = await this.repository.fetchNotes(userId);
            return notes;
        } catch (error) {
            throw error;
        }
    }

    async addReply(noteId: string, userId: string, reply: string): Promise<boolean> {
        try {
            const Reply = {
                noteId: noteId,
                authorId: userId,
                content: reply,
            }
            const success = await this.repository.saveReply(Reply);
            return success;
        } catch (error) {
            throw error;
        }
    }






}
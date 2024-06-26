import followModel from "../../data/data-sources/mongodb/models/followers";
import { NoteModel } from "../../data/data-sources/mongodb/models/note";
import { followers } from "../entities/follower";
import { Note } from "../entities/note";
import { NoteReply } from "../entities/noteReply";
import { INoteRepository } from "../interfaces/repositories/note-repository";

export class NoteRepositoryImpl implements INoteRepository {
    async saveNote(note: Note): Promise<boolean> {
        try {
            const newNote = await NoteModel.create(note);
            return true;
        } catch (error) {
            console.error('Error saving note:', error);
            throw error;
        }
    }

    async fetchNote(userId: string): Promise<Note | null> {
        try {
            const note: Note | null = await NoteModel.findOne({ userId: userId }).populate('replies.authorId', 'username name image');
            console.log('CONTROLLER', note);

            return note;
        } catch (error) {
            console.error('Error fetching note:', error);
            throw error;
        }
    }

    async removeNote(userId: string): Promise<boolean> {
        try {
            const success = await NoteModel.findOneAndDelete({ userId: userId });
            return !!success;
        } catch (error) {
            console.error('Error removing note:', error);
            throw error;
        }
    }

    async fetchNotes(userId: string): Promise<Note[] | null> {
        try {
            const followers = await followModel.find({ follower_id: userId });
            const followerIds = followers.map((follower) => follower.followed_id);
    
            const notes = await Promise.all(
                followerIds.map((followerId) => NoteModel.findOne({ userId: followerId }).populate('userId', 'username name image'))
            );
    
            const filteredNotes = notes.filter((note) => note !== null);
            return filteredNotes;
        } catch (error) {
            console.error('Error fetching note:', error);
            throw error;
        }
    }
    
    async saveReply(Reply: NoteReply): Promise<boolean> {
        try {
            const { noteId, ...restOfReply } = Reply;
            const updatedNote = await NoteModel.findOneAndUpdate(
                { _id: noteId },
                { $push: { replies: restOfReply } }
            );
            return updatedNote !== null;
        } catch (error) {
            console.error('Error saving note:', error);
            throw error;
        }
    }



}
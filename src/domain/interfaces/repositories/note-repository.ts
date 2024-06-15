import { Note } from "../../entities/note";
import { NoteReply } from "../../entities/noteReply";

export interface INoteRepository {
    saveNote(note: Note): Promise<boolean>
    fetchNote(userId: string): Promise<Note | null>
    removeNote(userId: string): Promise<boolean>
    fetchNotes(userId: string): Promise<Note[] | null>
    saveReply(Reply:NoteReply): Promise<boolean>
}
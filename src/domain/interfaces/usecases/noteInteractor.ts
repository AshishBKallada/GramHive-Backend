import { Note } from "../../entities/note"

export interface INoteInteractor {
    addNote(userId: string, note: string): Promise<boolean>
    getNote(userId: string): Promise<Note | null>
    removeNote(userId: string): Promise<boolean>
    getNotes(userId: string): Promise<Note[] | null>
    addReply(noteId:string,userId:string, reply: string): Promise<boolean>
}
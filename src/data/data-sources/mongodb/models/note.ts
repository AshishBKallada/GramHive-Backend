import { Schema, model } from 'mongoose';
import { Note } from '../../../../domain/entities/note';
import mongoose from 'mongoose';

const replySchema = new Schema({
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
const noteSchema = new Schema<Note>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [replySchema],
}, {
    expireAfterSeconds: 24 * 60 * 60,
});


export const NoteModel = model<Note>('Note', noteSchema);

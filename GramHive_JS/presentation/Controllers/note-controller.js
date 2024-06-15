"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
class NoteController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onAddNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            const note = req.body.note;
            try {
                const success = yield this.interactor.addNote(userId, note);
                res.status(201).json({ message: 'Note added successfully!', success });
            }
            catch (error) {
                console.error('Error adding note:', error);
                res.status(500).json({ message: 'Failed to add note' });
            }
        });
    }
    onGetNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const note = yield this.interactor.getNote(userId);
                res.status(200).json(note);
            }
            catch (error) {
                console.error('Error adding note:', error);
                res.status(500).json({ message: 'Failed to add note' });
            }
        });
    }
    onRemoveNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const success = yield this.interactor.removeNote(userId);
                res.status(200).json(success);
            }
            catch (error) {
                console.error('Error deleting note:', error);
                res.status(500).json({ message: 'Failed to delete note' });
            }
        });
    }
    onGetNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const notes = yield this.interactor.getNotes(userId);
                res.status(200).json(notes);
            }
            catch (error) {
                console.error('Error fetching notes:', error);
                res.status(500).json({ message: 'Failed to fetch notes' });
            }
        });
    }
    onAddReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            const noteId = req.body.noteId;
            const reply = req.body.reply;
            try {
                const success = yield this.interactor.addReply(noteId, userId, reply);
                res.status(201).json({ message: 'Reply added successfully!', success });
            }
            catch (error) {
                console.error('Error adding note:', error);
                res.status(500).json({ message: 'Failed to add reply' });
            }
        });
    }
}
exports.NoteController = NoteController;

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
exports.NoteInteractorImpl = void 0;
class NoteInteractorImpl {
    constructor(repository) {
        this.repository = repository;
    }
    addNote(userId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Note = {
                    userId: userId,
                    note: note
                };
                const success = yield this.repository.saveNote(Note);
                return success;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNote(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield this.repository.fetchNote(userId);
                return note;
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeNote(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.repository.removeNote(userId);
                return success;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield this.repository.fetchNotes(userId);
                return notes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addReply(noteId, userId, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Reply = {
                    noteId: noteId,
                    authorId: userId,
                    content: reply,
                };
                const success = yield this.repository.saveReply(Reply);
                return success;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.NoteInteractorImpl = NoteInteractorImpl;

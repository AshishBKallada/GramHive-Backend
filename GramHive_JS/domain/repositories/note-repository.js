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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepositoryImpl = void 0;
const followers_1 = __importDefault(require("../../data/data-sources/mongodb/models/followers"));
const note_1 = require("../../data/data-sources/mongodb/models/note");
class NoteRepositoryImpl {
    saveNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield note_1.NoteModel.create(note);
                return true;
            }
            catch (error) {
                console.error('Error saving note:', error);
                throw error;
            }
        });
    }
    fetchNote(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_1.NoteModel.findOne({ userId: userId }).populate('replies.authorId', 'username name image');
                console.log('CONTROLLER', note);
                return note;
            }
            catch (error) {
                console.error('Error fetching note:', error);
                throw error;
            }
        });
    }
    removeNote(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield note_1.NoteModel.findOneAndDelete({ userId: userId });
                return !!success;
            }
            catch (error) {
                console.error('Error removing note:', error);
                throw error;
            }
        });
    }
    fetchNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followers = yield followers_1.default.find({ follower_id: userId });
                const followerIds = followers.map((follower) => follower.followed_id);
                const notes = yield Promise.all(followerIds.map((followerId) => note_1.NoteModel.findOne({ userId: followerId }).populate('userId', 'username name image')));
                const filteredNotes = notes.filter((note) => note !== null);
                return filteredNotes;
            }
            catch (error) {
                console.error('Error fetching note:', error);
                throw error;
            }
        });
    }
    saveReply(Reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { noteId } = Reply, restOfReply = __rest(Reply, ["noteId"]);
                const updatedNote = yield note_1.NoteModel.findOneAndUpdate({ _id: noteId }, { $push: { replies: restOfReply } });
                return updatedNote !== null;
            }
            catch (error) {
                console.error('Error saving note:', error);
                throw error;
            }
        });
    }
}
exports.NoteRepositoryImpl = NoteRepositoryImpl;

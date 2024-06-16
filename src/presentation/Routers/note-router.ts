import { Router } from "express";
import { NoteRepositoryImpl } from "../../domain/repositories/note-repository";
import { NoteInteractorImpl } from "../../domain/usecases/noteIntercator";
import { NoteController } from "../Controllers/note-controller";
import userAuth from "../../middlewares/authMiddleware";
import { noteValidationRules } from "../../validators/noteValidator";
import { handleValidationErrors } from "../../middlewares/validationMiddleware";

const repository = new NoteRepositoryImpl();
const interactor = new NoteInteractorImpl(repository);
const controller =  new NoteController(interactor);

const noteRouter : Router = Router();

noteRouter.post('/addnote', userAuth, noteValidationRules.addNote, handleValidationErrors, controller.onAddNote.bind(controller));
noteRouter.get('/getnote', userAuth, noteValidationRules.getNote, handleValidationErrors, controller.onGetNote.bind(controller));
noteRouter.delete('/deletenote', userAuth, noteValidationRules.removeNote, handleValidationErrors, controller.onRemoveNote.bind(controller));
noteRouter.get('/', userAuth, noteValidationRules.getNotes, handleValidationErrors, controller.onGetNotes.bind(controller));
noteRouter.post('/reply', userAuth, noteValidationRules.addReply, handleValidationErrors, controller.onAddReply.bind(controller));


export default noteRouter;
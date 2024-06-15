import { Router } from "express";
import { NoteRepositoryImpl } from "../../domain/repositories/note-repository";
import { NoteInteractorImpl } from "../../domain/usecases/noteIntercator";
import { NoteController } from "../Controllers/note-controller";
import userAuth from "../../Middlewares/authMiddleware";

const repository = new NoteRepositoryImpl();
const interactor = new NoteInteractorImpl(repository);
const controller =  new NoteController(interactor);

const noteRouter : Router = Router();

noteRouter.post('/addnote',userAuth,controller.onAddNote.bind(controller));
noteRouter.get('/getnote',userAuth,controller.onGetNote.bind(controller));
noteRouter.delete('/deletenote',userAuth,controller.onRemoveNote.bind(controller));
noteRouter.get('/',userAuth,controller.onGetNotes.bind(controller));
noteRouter.post('/reply',userAuth,controller.onAddReply.bind(controller));

export default noteRouter;
import { Application } from "express";
import userRouter from "../presentation/Routers/user-router";
import adminRouter from "../presentation/Routers/admin-router";
import postRouter from "../presentation/Routers/post-router";
import commentRouter from "../presentation/Routers/comment-router";
import profileRouter from "../presentation/Routers/profile-router";
import authRouter from "../presentation/Routers/auth-router";
import storyRouter from "../presentation/Routers/story-router";
import chatRouter from "../presentation/Routers/chat-router";

const routes: Function = (app: Application) => {
    app.use('/admin',adminRouter)
    app.use('/', userRouter)
    app.use('/posts',postRouter)
    app.use('/comment',commentRouter)
    app.use('/profile',profileRouter)
    app.use('/auth',authRouter)
    app.use('/story',storyRouter)
    app.use('/chats',chatRouter)
}

export default routes;
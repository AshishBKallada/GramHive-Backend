import { Application } from "express";
import userRouter from "../presentation/Routers/user-router";
import adminRouter from "../presentation/Routers/admin-router";
import postRouter from "../presentation/Routers/post-router";
import commentRouter from "../presentation/Routers/comment-router";
import profileRouter from "../presentation/Routers/profile-router";
import authRouter from "../presentation/Routers/auth-router";
import storyRouter from "../presentation/Routers/story-router";
import chatRouter from "../presentation/Routers/chat-router";
import messageRouter from "../presentation/Routers/message-router";
import reportRouter from "../presentation/Routers/report-router";
import adRouter from "../presentation/Routers/ad-router";
import { liveRouter } from "../presentation/Routers/live-router";
import notificationRouter from "../presentation/Routers/notification-router";
import noteRouter from "../presentation/Routers/note-router";

const routes: Function = (app: Application) => {
    app.use('/admin', adminRouter)
    app.use('/', userRouter)
    app.use('/posts', postRouter)
    app.use('/comment', commentRouter)
    app.use('/profile', profileRouter)
    app.use('/auth', authRouter)
    app.use('/story', storyRouter)
    app.use('/chats', chatRouter) 
    app.use('/messages', messageRouter)
    app.use('/reports', reportRouter)
    app.use('/ads', adRouter)
    app.use('/live', liveRouter)
    app.use('/notifications', notificationRouter)
    app.use('/notes', noteRouter);
}

export default routes;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentRouter = (0, express_1.Router)();
commentRouter.post('/posts/:postId/addcomments', Middleware.addComments);
commentRouter.get('/posts/:postId/comments', Middleware.getComments);
commentRouter.post('/comments/:postId/replies/:commentId', Middleware.addCommentReply);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("../presentation/Routers/user-router"));
const admin_router_1 = __importDefault(require("../presentation/Routers/admin-router"));
const post_router_1 = __importDefault(require("../presentation/Routers/post-router"));
const comment_router_1 = __importDefault(require("../presentation/Routers/comment-router"));
const profile_router_1 = __importDefault(require("../presentation/Routers/profile-router"));
const auth_router_1 = __importDefault(require("../presentation/Routers/auth-router"));
const story_router_1 = __importDefault(require("../presentation/Routers/story-router"));
const chat_router_1 = __importDefault(require("../presentation/Routers/chat-router"));
const message_router_1 = __importDefault(require("../presentation/Routers/message-router"));
const routes = (app) => {
    app.use('/admin', admin_router_1.default);
    app.use('/', user_router_1.default);
    app.use('/posts', post_router_1.default);
    app.use('/comment', comment_router_1.default);
    app.use('/profile', profile_router_1.default);
    app.use('/auth', auth_router_1.default);
    app.use('/story', story_router_1.default);
    app.use('/chats', chat_router_1.default);
    app.use('/messages', message_router_1.default);
};
exports.default = routes;

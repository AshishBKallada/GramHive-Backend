"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./presentation/Controllers/user-router"));
const user_1 = require("./domain/usecases/user");
const user_repository_1 = require("./domain/repositories/user-repository");
const db_config_1 = require("./data/interfaces/data-sources/db-config");
const admin_router_1 = __importDefault(require("./presentation/Controllers/admin-router"));
const admin_repository_1 = require("./domain/repositories/admin-repository");
const admin_1 = require("./domain/usecases/admin");
const app = (0, express_1.default)();
const cors = require('cors');
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
(0, db_config_1.connectToMongoDB)();
const userRepository = new user_repository_1.UserRepositoryImpl();
const userService = new user_1.UserService(userRepository);
const adminRepository = new admin_repository_1.AdminRepositoryImpl();
const adminService = new admin_1.AdminService(adminRepository);
app.use('/', (0, user_router_1.default)(userService));
app.use('/admin', (0, admin_router_1.default)(adminService));
// app.use((req,res,next)=>{
//     if(req.path !== '/login' && req.path !== '/signup'){
//         auth(req,res,next);
//     }
//     else{
//         next();
//     }
// });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

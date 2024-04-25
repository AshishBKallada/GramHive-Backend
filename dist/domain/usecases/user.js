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
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService: login');
                console.log('Username:', credentials.username);
                console.log('Password:', credentials.password);
                const { user, token } = yield this.userRepository.findByCredentials(credentials.username, credentials.password);
                console.log('Usecase', user, token);
                return { user, token };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService: signup');
                console.log('New user data:', userData);
                const newUser = {
                    username: userData.username,
                    name: userData.name,
                    password: userData.password,
                    email: userData.email,
                    image: userData.image
                };
                console.log(newUser);
                const { user, token } = yield this.userRepository.save(newUser);
                console.log('Usecase returned', user, token);
                return { user, token };
            }
            catch (error) {
                console.error('Error during signup:', error);
                throw error;
            }
        });
    }
    updateProfile(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = {
                    username: Data.username,
                    name: Data.name,
                    image: Data.image,
                    website: Data.website,
                    bio: Data.bio,
                    gender: Data.gender
                };
                console.log('NewDataXXXXXXXXXXXX', newData);
                const { success } = yield this.userRepository.updateProfile(newData);
                return { success };
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                return { success: false };
            }
        });
    }
}
exports.UserService = UserService;

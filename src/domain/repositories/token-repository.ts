import { generateAccessToken } from "../../functions/accessToken-generator";
import { generateRefreshToken } from "../../functions/refreshToken-generator";
import { verifyRefreshToken } from "../../functions/verify-refreshToken";
import { Token } from "../entities/tokens";
import { User } from "../entities/user";
import { ITokenRepository } from "../interfaces/repositories/token-repository";

export class TokenRepositoryImpl implements ITokenRepository {
    async generateTokens(user: User): Promise<Token> {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(token: string): Promise<any> {
        return verifyRefreshToken(token);
    }

}
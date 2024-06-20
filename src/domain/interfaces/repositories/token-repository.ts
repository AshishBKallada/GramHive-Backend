import { Token } from "../../entities/tokens"
import { User } from "../../entities/user"

export interface ITokenRepository {
    generateTokens(user: User): Promise<any>
    verifyRefreshToken(refreshToken: string): Promise<Token>
}
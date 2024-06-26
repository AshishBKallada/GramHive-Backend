import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../../data/data-sources/mongodb/models/user';
import { generateAccessToken } from '../../functions/accessToken-generator';

const authRouter = express.Router();

authRouter.post('/refresh-token', async (req, res) => {
    console.log('REFRESH TOKEN ENDPOINT CALLED');
    
    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, 'thadavil__aanu') as JwtPayload & {
            userId:string;
        }

        
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const accessToken = generateAccessToken(user);

        res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
});
export default authRouter;
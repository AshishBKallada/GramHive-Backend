import { Request, Response, NextFunction } from "express";
import { UserInteractor } from "../../domain/interfaces/usecases/userInteractor";

export class userController {

    constructor(private readonly interactor: UserInteractor) { }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Login Controller');
            console.log('logindata', req.body);

            const { username, password } = req.body;
            console.log(username, password);

            const { user, message, token, refreshToken } = await this.interactor.login({ username: username, password });

            if (user) {
                console.log('userController:', user, 'Token', token,'refreshToken', refreshToken);

                res.status(200).json({ message: 'Login successful', user, token: token,refreshToken });
            } else {
                console.log('1111');

                res.status(401).json({ message: message });
            }
        } catch (e) {
            console.error('Error during login:', e);
            res.status(500).send('Internal server error');
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, username, password, image } = req.body;
            console.log('1', req.body);

            const { user, token } = await this.interactor.signup({ username, name, password, email, image: image ? image : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' });
            console.log('returned ' + user, token);

            res.status(200).json({ message: 'Signup successful', user, token });
        } catch (e) {
            console.error('Error during signup:', e);
            res.status(500).send('Internal server error');
        }
    }

    async sendMail(req: Request, res: Response) {
        try {
            console.log('1', req.body.email);

            const signupData = req.body;
            const { userExists, isMailSent } = await this.interactor.sendMail(signupData);

            if (userExists) {
                res.status(400).json({ success: false, message: 'User already exists.' });
            } else if (isMailSent) {
                res.status(200).json({ success: true, message: 'Email sent successfully.' });
            } else {
                res.status(500).json({ success: false, message: 'Failed to send email.' });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async verifyOTP(req: Request, res: Response) {
        try {
            console.log('1');

            const { otp } = req.body;
            const { success, token } = await this.interactor.verifyotp(otp);
            if (success) {
                console.log('7', token);

                res.status(200).json({ success: true, message: 'OTP verified successfully.', token });
            } else {
                res.status(400).json({ success: false, message: 'Invalid OTP.' });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async searchUser(req: Request, res: Response) {
        try {
            console.log('1');

            const filter = req.params.query;
            const searchResults = await this.interactor.getSearchData(filter);
            if (searchResults) {
                console.log('outer', searchResults);

                return res.status(200).json(searchResults)
            } else {
                return res.status(404).json({ message: 'Failed to retreive search data.' });
            }
        }
        catch (e) {
            console.error('Error retreiving posts', e);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async getSearchUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            console.log('1', userId);
            const { user, followers, following } = await this.interactor.getSearchUser(userId);
            if (user) {
                console.log('--------------------------------', user, followers, following);
                return res.status(200).json({ success: true, message: 'User data fetched successfully.', user, followers, following });
            } else {
                return res.status(500).json({ success: false, message: 'Failed to retrieve searched user data' });
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

}

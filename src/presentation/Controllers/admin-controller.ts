import { Request, Response, NextFunction } from "express";
import { User } from "../../domain/entities/user";
import { AdminInteractor } from "../../domain/interfaces/usecases/adminInteractor";

export class AdminController {

    constructor(private readonly interactor:AdminInteractor ){}

    async onLogin(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('ADMIN ROUTER ', req.body);
            const { email, password } = req.body;

            const { admin, token } = await this.interactor.login({ email, password });

            if (admin) {
                console.log('adminController:', admin, token);

                res.status(200).json({ message: 'Login successful', admin: admin, token: token });
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (e) {
            console.error('Error during login:', e);
            res.status(500).send('Internal server error');
        }

    }

    async onGetUsers(req: Request, res: Response, next: NextFunction){
    try {
        console.log('111');

        const users: User[] = await this.interactor.getAllUsers();

        // console.log('AdminROuter users:', users);


        res.json(users);
    } catch (e) {
        console.error('Error fetching user data:', e);
        res.status(500).send('Internal server error');
    }
}
    async onBlockUser(req: Request, res: Response, next: NextFunction){
    try {
        const userId = req.params.userId;
        console.log('Block user backend////////////////////////////////////////////////////////////////////', userId);

        const isBlocked = await this.interactor.blockUser(userId);
        console.log(isBlocked, '................................................');

        if (isBlocked.success) {
            res.status(200).json({ message: `User with ID ${userId} has been blocked successfully.`, status: isBlocked.status });
        }
    } catch (e) {
        console.error('Error blocking user:', e);
        res.status(500).json({ error: 'An error occurred while blocking the user.' });
    }
}
}
import { Request, Response, NextFunction } from "express";
import { User } from "../../domain/entities/user";
import { AdminInteractor } from "../../domain/interfaces/usecases/adminInteractor";

export class AdminController {

    constructor(private readonly interactor: AdminInteractor) { }

    async onLogin(req: Request, res: Response): Promise<void> {
        try {
            
            const { email, password } = req.body;
            const result = await this.interactor.login({ email, password });
            console.log('ADMIN CONTROLLER',result);

            res.json(result);
          } catch (error) {
            if (error.message === 'Invalid email') {
              res.status(401).json({ message: 'Invalid email' });
            } else if (error.message === 'Invalid password') {
              res.status(401).json({ message: 'Invalid password' });
            } else {
              res.status(500).json({ message: 'Internal server error' });
            }
          }
        
      }

    async onGetUsers(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('111');

            const users: User[] = await this.interactor.getAllUsers();

            res.json(users);
        } catch (e) {
            console.error('Error fetching user data:', e);
            res.status(500).send('Internal server error');
        }
    }
    async onBlockUser(req: Request, res: Response, next: NextFunction) {
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

    async onGetReviews(req: Request, res: Response): Promise<Response> {
        const filter = req.params.filter;
        try {
            const reviews = await this.interactor.getReviews(filter);
            return res.status(200).json(reviews);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

    async onPostReports(req: Request, res: Response): Promise<Response> {
        try {
            const reports = await this.interactor.getPostReports();
            return res.status(200).json(reports);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

    async onPostBan(req: Request, res: Response): Promise<Response> {
        try {
            console.log('1');

            const postId = req.params.postId;
            const { success, message } = await this.interactor.PostBan(postId);
            return res.status(200).json({ success, message });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

    async onUserReports(req: Request, res: Response): Promise<Response> {
        try {
            const userReports = await this.interactor.userReports();
            console.log('user', userReports);

            return res.status(200).json(userReports);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

    async onGetTransactions(req: Request, res: Response) {
        try {
            const transactions = await this.interactor.getTransactions();
            console.log('transactions', transactions);
            
            return res.status(200).json(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
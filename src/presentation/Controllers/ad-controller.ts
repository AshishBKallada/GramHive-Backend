import { Request, Response } from "express";
import { IAdInteractor } from "../../domain/interfaces/usecases/adInteractor";
import { Ad } from "../../domain/entities/ad";

export class AdController {
    constructor(private readonly interactor: IAdInteractor) { }

    async onNewAdd(req: Request, res: Response) {

        const formData = req.body;
        const user = req.user._id;

        formData.images = formData.images.map((img: any, index: number) => {
            return {
                ...img,
                imageFile: req.imageUrls[index],
            };
        });

        formData.user = user;

        try {
            const { order, Id } = await this.interactor.addnewAd(formData as Ad);
            return res.status(201).json({ order, Id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async onConfirmPay(req: Request, res: Response) {

        try {
            const Id = req.params.Id;
            const Ad = await this.interactor.confirmPay(Id);
            return res.status(200).json(Ad);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async onGetAds(req: Request, res: Response) {
        try {
            const userId = req.user._id;
            const Ads = await this.interactor.getAds(userId);
            return res.status(200).json(Ads);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async onGetHomeAds(req: Request, res: Response) {
        try {
            const Ads = await this.interactor.getHomeAds();
            return res.status(200).json(Ads);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    

}
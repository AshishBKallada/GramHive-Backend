import AdModel from "../../data/data-sources/mongodb/models/ad";
import { Ad } from "../entities/ad";
import { IAdRepository } from "../interfaces/repositories/ad-repository";

export class AdReporsitoryImpl implements IAdRepository {
    async savenewAd(newAd: Ad): Promise<any> {

        try {
            const savedAd = await AdModel.create(newAd);
            return savedAd;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async confirmPay(Id: string): Promise<any> {
        try {
            const Ad = await AdModel.findByIdAndUpdate(Id, { payment: 'paid' });
            return Ad;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAds(Id: string): Promise<any> {
        try {
            const Ads = await AdModel.find({ user: Id });
            return Ads
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async getHomeAds(): Promise<any> {
        try {
            const Ads = await AdModel.find({});
            return Ads
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}

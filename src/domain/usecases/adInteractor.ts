import { Ad } from "../entities/ad";
import { IRazorpay } from "../interfaces/external-lib/razorpayOrderCreator";
import { IAdRepository } from "../interfaces/repositories/ad-repository";
import { IAdInteractor } from "../interfaces/usecases/adInteractor";

export class AdInteractorImpl implements IAdInteractor {
    constructor(private readonly Repository: IAdRepository, private readonly Razorpay: IRazorpay) { }

    async addnewAd(newAd: Ad): Promise<boolean | Ad | any> {
        try {
            const createdAd = await this.Repository.savenewAd(newAd);

            if (createdAd) {

                const order = await this.Razorpay.createOrder(createdAd.rate, createdAd._id);
                const Id = createdAd._id;

                return { order, Id };
            }
        } catch (error) {
            return false;
        }
    }

    async confirmPay(Id: string): Promise<any> {
        try {
            const Ad = await this.Repository.confirmPay(Id);
            return Ad;
        } catch (error) {
            return null;
        }
    }

    async getAds(Id: string): Promise<any> {
        try {
            const Ads = await this.Repository.getAds(Id);
            return Ads;
        } catch (error) {
            return null;
        }
    }

    async getHomeAds(): Promise<any> {
        try {
            
            const Ads = await this.Repository.getHomeAds();
            return Ads;

        } catch (error) {
            return null;

        }
    }



}
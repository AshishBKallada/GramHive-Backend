import { Ad } from "../../entities/ad";

export interface IAdRepository {
    savenewAd(newAd: Ad): Promise<any>
    confirmPay(Id: string): Promise<any>
    getAds(Id: string): Promise<any>
    getHomeAds(): Promise<any>
}
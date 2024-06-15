import { Ad } from "../../entities/ad";

export interface IAdInteractor {
    addnewAd( newAd: Ad): Promise<boolean | Ad | any>
    confirmPay(Id: string): Promise<any>
    getAds(Id:string): Promise<any>
    getHomeAds():Promise<any>
}
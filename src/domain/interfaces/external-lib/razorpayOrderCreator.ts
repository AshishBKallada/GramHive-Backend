export interface IRazorpay{
    createOrder(rate: any,Id:any): Promise<any> 
}
import razorpayInstance from "../../config/razorpayConfig";
import { IRazorpay } from "../interfaces/external-lib/razorpayOrderCreator";

export class RazorpayOrderImpl implements IRazorpay {
    async createOrder(rate: any, Id: any): Promise<any> {
        console.log('creatinng order ',rate,Id);
        
        const options = {
            amount: rate * 100,
            currency: 'INR',
            receipt: `receipt_${Id}`,
            payment_capture: 1
        };

        try {
            const order = await razorpayInstance.orders.create(options);
            console.log('Order created successfully:', order);
            return order;
          } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Order creation failed');
          }
        
       
    }
}
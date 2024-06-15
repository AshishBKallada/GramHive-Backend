"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayOrderImpl = void 0;
const razorpayConfig_1 = __importDefault(require("../../config/razorpayConfig"));
class RazorpayOrderImpl {
    createOrder(rate, Id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('creatinng order ', rate, Id);
            const options = {
                amount: rate * 100,
                currency: 'INR',
                receipt: `receipt_${Id}`,
                payment_capture: 1
            };
            try {
                const order = yield razorpayConfig_1.default.orders.create(options);
                console.log('Order created successfully:', order);
                return order;
            }
            catch (error) {
                console.error('Error creating order:', error);
                throw new Error('Order creation failed');
            }
        });
    }
}
exports.RazorpayOrderImpl = RazorpayOrderImpl;

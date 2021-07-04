import mongoose, { Schema } from 'mongoose';

export interface ICoupon extends Document {
  couponType: string;
  couponHost: string;
  clearonMobileURL?: string;
}

const CouponSchema: Schema = new Schema({
  couponType: {
    type: String,
    required: true
  },
  couponHost: {
    type: String,
    required: true
  },
  clearonMobileURL: String
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);

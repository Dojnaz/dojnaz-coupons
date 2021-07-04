import mongoose, { Schema } from 'mongoose';

export interface ICouponType extends Document {
  name: string;
  description?: string;
  clearonMobileIdentifier?: string;
  price: number;
  slug: string;
  img: string;
}

const CouponTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  clearonMobileIdentifier: String,
  price: {
    type: Number,
    default: 5
  },
  slug: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

export default mongoose.model<ICouponType>('CouponType', CouponTypeSchema);

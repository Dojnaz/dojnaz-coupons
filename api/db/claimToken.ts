import mongoose, { Schema } from 'mongoose';

export interface IClaimToken extends Document {
  owner: string;
  token: string;
  created: number;
}

const ClaimTokenSchema: Schema = new Schema({
  owner: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IClaimToken>('ClaimToken', ClaimTokenSchema);

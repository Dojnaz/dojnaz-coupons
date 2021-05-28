import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  email?: string;
  number?: string;
  password?: string;
  unclaimed: boolean;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  number: {
    type: String,
    unique: true
  },
  password: String,
  unclaimed: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  email?: string;
  number?: string;
  password?: string;
  unclaimed: boolean;
  name?: string;
}

const UserSchema: Schema = new Schema({
  name: String,
  email: {
    type: String
  },
  number: {
    type: String
  },
  password: String,
  unclaimed: {
    type: Boolean,
    default: false
  },
});

export default mongoose.model<IUser>('User', UserSchema);

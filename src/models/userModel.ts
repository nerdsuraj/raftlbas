import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}


const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

export const User = model<IUser>('User_master', userSchema);

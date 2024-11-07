import mongoose, { Document, Schema } from 'mongoose';

interface Address {
  building: string;
  coord: [number, number];
  street: string;
  zipcode: string;
}

interface Grade {
  date: Date;
  grade: string;
  score: number;
}

export interface RestaurantDocument extends Document {
  address: Address;
  borough: string;
  cuisine: string;
  grades: Grade[];
  name: string;
  restaurant_id: string;
}

const AddressSchema = new Schema<Address>({
  building: { type: String, required: true },
  coord: { type: [Number], required: true },
  street: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const GradeSchema = new Schema<Grade>({
  date: { type: Date, required: true },
  grade: { type: String, required: true },
  score: { type: Number, required: true },
});

const RestaurantSchema = new Schema<RestaurantDocument>({
  address: { type: AddressSchema, required: true },
  borough: { type: String, required: true },
  cuisine: { type: String, required: true },
  grades: { type: [GradeSchema], required: true },
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
});

export const Restaurant = mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema);

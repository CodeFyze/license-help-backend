import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  // customerName: string;
  date: Date;
  time: string; // New field
  duration: string; // New field
  pickupLocation: string; // New field
  suburb: string; // New field
  state: string; // New field
  status: string;
  price: number;
  isDrivingTestPackage: boolean;
}

const bookingSchema: Schema = new Schema(
  {
    // customerName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // New field
    duration: { type: String, required: true }, // New field
    pickupLocation: { type: String, required: true }, // New field
    suburb: { type: String, required: true }, // New field
    state: { type: String, required: true }, // New field
    status: { type: String, required: true, default: "pending" },
    price: { type: Number, required: true },
    isDrivingTestPackage: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;

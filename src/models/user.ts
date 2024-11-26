import { Schema, model, Document, Types } from "mongoose";

export enum UserRole {
  Student = "student",
  Instructor = "instructor",
  Admin = "admin",
}

interface IUser extends Document {
  _id: Types.ObjectId
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Student,
  },
});

export const User = model<IUser>("User", userSchema);

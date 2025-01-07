import { Schema, model, Document, Types } from "mongoose";

// Define possible user roles
export enum UserRole {
  Student = "student",
  Instructor = "instructor",
  Admin = "admin",
}

// Define the User schema interface
interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  firstName?: string; // Optional for instructors
  surname?: string; // Optional for instructors
  phone?: string; // Optional for instructors
  postcode?: string; // Optional for instructors
  transmission?: string; // Optional for instructors
  subject?: string; // Optional for instructors
  message?: string; // Optional for instructors
  // attachments?: [Buffer]; // Optional for instructors
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema with role-based fields
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.Student },
  
  // Instructor-specific fields (conditionally required based on the role)
  firstName: { type: String, required: function() { return this.role === UserRole.Instructor; } },
  surname: { type: String, required: function() { return this.role === UserRole.Instructor; } },
  phone: { type: String, required: function() { return this.role === UserRole.Instructor; } },
  postcode: { type: String, required: function() { return this.role === UserRole.Instructor; } },
  transmission: { type: String, enum: ["Automatic", "Manual"], required: function() { return this.role === UserRole.Instructor; }, default: "Automatic" },
  subject: { type: String, required: function() { return this.role === UserRole.Instructor; }, default: "" },
  message: { type: String, required: function() { return this.role === UserRole.Instructor; } },
  // attachments: { type: [Buffer], required: function() { return this.role === UserRole.Instructor; }, default: [] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Model for the User schema
export const User = model<IUser>("User", userSchema);

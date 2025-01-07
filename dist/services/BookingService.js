"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class BookingService {
    async createBooking(
    // customerName: string,
    date, time, duration, pickupLocation, suburb, state, price, isDrivingTestPackage) {
        try {
            const newBooking = new bookingModel_1.default({
                // customerName,
                date,
                time,
                duration,
                pickupLocation,
                suburb,
                state,
                price,
                isDrivingTestPackage,
            });
            await newBooking.save();
            return newBooking;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Error creating booking: " + error.message);
            }
            else {
                throw new Error("Unknown error occurred while creating booking");
            }
        }
    }
    async getAllBookings() {
        try {
            const bookings = await bookingModel_1.default.find();
            return bookings;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching bookings: ' + error.message);
            }
            else {
                throw new Error('Unknown error occurred while fetching bookings');
            }
        }
    }
    async getBookingById(id) {
        try {
            const booking = await bookingModel_1.default.findById(id);
            if (!booking)
                throw new Error('Booking not found');
            return booking;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching booking: ' + error.message);
            }
            else {
                throw new Error('Unknown error occurred while fetching booking');
            }
        }
    }
    async updateBookingStatus(id, status) {
        try {
            const updatedBooking = await bookingModel_1.default.findByIdAndUpdate(id, { status }, { new: true });
            if (!updatedBooking)
                throw new Error('Booking not found');
            return updatedBooking;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error updating booking status: ' + error.message);
            }
            else {
                throw new Error('Unknown error occurred while updating booking status');
            }
        }
    }
    async deleteBooking(id) {
        try {
            const deletedBooking = await bookingModel_1.default.findByIdAndDelete(id);
            if (!deletedBooking)
                throw new Error('Booking not found');
            return deletedBooking;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error deleting booking: ' + error.message);
            }
            else {
                throw new Error('Unknown error occurred while deleting booking');
            }
        }
    }
}
exports.default = BookingService;

import Booking from "../models/bookingModel";

export default class BookingService {
  public async createBooking(
    // customerName: string,
    date: Date,
    time: string,
    duration: string,
    pickupLocation: string,
    suburb: string,
    state: string,
    price: number,
    isDrivingTestPackage: boolean
  ) {
    try {
      const newBooking = new Booking({
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error creating booking: " + error.message);
      } else {
        throw new Error("Unknown error occurred while creating booking");
      }
    }
  }
  public async getAllBookings() {
    try {
      const bookings = await Booking.find();
      return bookings;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error fetching bookings: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while fetching bookings');
      }
    }
  }

  public async getBookingById(id: string) {
    try {
      const booking = await Booking.findById(id);
      if (!booking) throw new Error('Booking not found');
      return booking;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error fetching booking: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while fetching booking');
      }
    }
  }

  public async updateBookingStatus(id: string, status: string) {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedBooking) throw new Error('Booking not found');
      return updatedBooking;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error updating booking status: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while updating booking status');
      }
    }
  }

  public async deleteBooking(id: string) {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      if (!deletedBooking) throw new Error('Booking not found');
      return deletedBooking;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error deleting booking: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while deleting booking');
      }
    }
  }
}

// import express, { Request, Response } from 'express';
// import BookingService from "../services/BookingService";

// const router = express.Router();
// const bookingService = new BookingService(); 

// router.post("/create", async (req: Request, res: Response) => {
//   const {
//     customerName,
//     date,
//     time,
//     duration,
//     pickupLocation,
//     suburb,
//     state,
//     price,
//     isDrivingTestPackage, 
//   } = req.body;

//   try {
//     const booking = await bookingService.createBooking(
//       customerName,
//       date,
//       time,
//       duration,
//       pickupLocation,
//       suburb,
//       state,
//       price,
//       isDrivingTestPackage
//     );
//     res.status(201).json(booking);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "Unknown error occurred while creating booking" });
//     }
//   }
// });

// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const bookings = await bookingService.getAllBookings();  
//     res.status(200).json(bookings);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Unknown error occurred while fetching bookings' });
//     }
//   }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const booking = await bookingService.getBookingById(id);  
//     res.status(200).json(booking);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Unknown error occurred while fetching booking' });
//     }
//   }
// });

// router.put('/:id/status', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const updatedBooking = await bookingService.updateBookingStatus(id, status); 
//     res.status(200).json(updatedBooking);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Unknown error occurred while updating booking status' });
//     }
//   }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const deletedBooking = await bookingService.deleteBooking(id); 
//     res.status(200).json(deletedBooking);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Unknown error occurred while deleting booking' });
//     }
//   }
// });

// export default router;

import express, { Request, Response } from 'express';
import BookingService from "../services/BookingService";

const router = express.Router();
const bookingService = new BookingService(); 

router.post("/create", async (req: Request, res: Response) => {
  const {
    date,
    time,
    duration,
    pickupLocation,
    suburb,
    state,
    price,
    isDrivingTestPackage, 
  } = req.body;

  try {
    const booking = await bookingService.createBooking(
      date,
      time,
      duration,
      pickupLocation,
      suburb,
      state,
      price,
      isDrivingTestPackage
    );
    res.status(201).json(booking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred while creating booking" });
    }
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();  
    res.status(200).json(bookings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while fetching bookings' });
    }
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await bookingService.getBookingById(id);  
    res.status(200).json(booking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while fetching booking' });
    }
  }
});

router.put('/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await bookingService.updateBookingStatus(id, status); 
    res.status(200).json(updatedBooking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while updating booking status' });
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBooking = await bookingService.deleteBooking(id); 
    res.status(200).json(deletedBooking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while deleting booking' });
    }
  }
});

export default router;

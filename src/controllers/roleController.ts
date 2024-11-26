import { Request, Response } from 'express';
import { User } from '../models/user';

const assignRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning role' });
  }
};

export { assignRole };

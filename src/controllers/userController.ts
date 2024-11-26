import { Request, Response } from 'express';
import { User } from '../models/user';
import { Types } from 'mongoose'; 

interface ParamsWithId {
  id: string;
}

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getUser = async (req: Request<ParamsWithId>, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

const updateUser = async (req: Request<ParamsWithId>, res: Response) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req: Request<ParamsWithId>, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export { getUsers, getUser, updateUser, deleteUser };

import { Request, Response } from 'express';
import { User, UserRole } from '../models/user';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { generateToken } from '../config/jwt';


const getUsers = async (req: Request, res: Response) => {
  console.log('getUsers endpoint hit');

  try {
    const { role } = req.query; // Extract role from query
    const query = role ? { role } : {};
    const users = await User.find(query).select('-password'); // Exclude password from response

    console.log('Retrieved Users:', users); // Log the fetched users
    res.json(users); // Respond with the users
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching users:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    res.status(500).json({ message: 'Error fetching users' });
  }
};




// Get a single user by ID
const getUser = async (req: Request, res: Response) => {
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

// Update user details (username, email, role)
const updateUser = async (req: Request, res: Response) => {
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

// Delete a user by ID
const deleteUser = async (req: Request, res: Response) => {
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

// Assign a new role to a user
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

// Register a new user
const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || UserRole.Student, // Default to 'student' if no role is provided
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export { getUsers, getUser, updateUser, deleteUser, assignRole, register };

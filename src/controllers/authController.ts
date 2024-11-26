import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user'; 
import { generateToken } from '../config/jwt';

const register = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
  
    console.log('Register request received');
    console.log('Request Body:', req.body); 
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed Password:', hashedPassword);
  
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'student',
      });
  
      await user.save();
      console.log('User saved:', user);
  
      const token = generateToken(user._id.toString(), user.role);
      console.log('Generated Token:', token);

      res.status(201).json({ token, userId: user._id, role: user.role });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  };
  
  const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    console.log('Login request received');
    console.log('Request Body:', req.body);
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid credentials');
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id.toString(), user.role);
      console.log('Generated Token:', token);
  
      res.json({ token, userId: user._id, role: user.role });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  
  

export { register, login };

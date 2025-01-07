import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserRole } from '../models/user';
import { generateToken } from '../config/jwt';

const register = async (req: Request, res: Response) => {
    const { username, email, password, role, firstName, surname, phone, postcode, transmission, subject, message } = req.body;

    console.log('Register request received');
    console.log('Request Body:', req.body);  // Be cautious  when logging sensitive data like passwords.

    try {
        // Ensure password is provided
        if (!password) { 
            return res.status(400).json({ message: 'Password is required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Declare the variable for transmission outside the condition
        let instructorTransmission: string | undefined = transmission;

        // If the role is 'instructor', make sure all instructor fields are provided
        if (role === UserRole.Instructor) {
            if (!firstName || !surname || !phone || !postcode || !subject || !message) {
                return res.status(400).json({ message: 'All instructor fields are required (firstName, surname, phone, postcode, subject, message)' });
            }

            // If role is instructor, check if 'transmission' is provided, else default to 'Automatic'
            instructorTransmission = instructorTransmission || 'Automatic'; // Default to 'Automatic' if not provided
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);  // Log only if necessary.

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || UserRole.Student,
            firstName: role === UserRole.Instructor ? firstName : undefined,
            surname: role === UserRole.Instructor ? surname : undefined,
            phone: role === UserRole.Instructor ? phone : undefined,
            postcode: role === UserRole.Instructor ? postcode : undefined,
            transmission: role === UserRole.Instructor ? instructorTransmission : undefined,
            subject: role === UserRole.Instructor ? subject : undefined,
            message: role === UserRole.Instructor ? message : undefined,
        });

        // Save the user
        await user.save();
        console.log('User saved:', user);

        // Generate JWT token
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
    console.log('Request Body:', req.body);  // Be cautious when logging sensitive data like passwords.

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.role);
        console.log('Generated Token:', token);

        res.status(200).json({ token, userId: user._id, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

export { register, login };

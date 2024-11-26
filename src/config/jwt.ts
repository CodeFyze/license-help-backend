import jwt from 'jsonwebtoken';

const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { generateToken, verifyToken };

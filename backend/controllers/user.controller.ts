import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';

export async function saveUser(req: Request, res: Response) {
  try {
    const userData: IUser = req.body;

    const newUser = new User(userData);

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
}

export async function listUsers(req: Request, res: Response) {
  try {
    const users: IUser[] = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error listing users', error });
  }
}
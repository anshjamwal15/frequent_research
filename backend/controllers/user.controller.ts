import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';
import { Country, ICountry } from '../models/location.model';

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

export const getAllCountriesWithStatesAndCities = async (req: Request, res: Response) => {
  try {
    const countries = await Country.find({}, { name: 1, states: 1 });

    res.status(200).json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const saveStatesAndCitiesForCountry = async (req: Request, res: Response) => {
  const { name, states } = req.body;

  try {
    const country: ICountry = new Country({ name, states });

    const savedCountry: ICountry = await country.save();

    res.json(savedCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
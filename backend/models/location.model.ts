import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICity extends Document {
  name: string;
}

interface IState extends Document {
  name: string;
  cities: ICity[];
}

export interface ICountry extends Document {
  name: string;
  states: IState[];
}

const citySchema: Schema<ICity> = new mongoose.Schema({
  name: { type: String, required: true },
});

const stateSchema: Schema<IState> = new mongoose.Schema({
  name: { type: String, required: true },
  cities: [citySchema],
});

const countrySchema: Schema<ICountry> = new mongoose.Schema({
  name: { type: String, required: true },
  states: [stateSchema],
});

export const Country: Model<ICountry> = mongoose.model('Country', countrySchema);

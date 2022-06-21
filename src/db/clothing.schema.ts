import mongoose, { Schema, model, Model } from 'mongoose';
import { IClothing } from '../interfaces';

const clothingSchema = new Schema({
  name: { type: String, default: ''},
  brand: { type: String, default: ''},
  image: [{ type: String}],
  description: { type: String, default: ''},
  category: { type: String, default: ''},
  section: { type: String, default: ''},
  item: { type: String, default: ''},
  inStock: { type: Number, default: 0},
  price: { type: Number, default: 0},
  oldPrice: { type: Number, default: 0},
  tags: [{ type: String}],
  sizes: [{ type: String}],
  color: { type: String, default: 0},
  site: { type: String, default: 0},
  slug: { type: String},
  status: { type: Boolean},
})

const Clothing:Model<IClothing> = mongoose.models.Clothing || model('Clothing',clothingSchema);

export default Clothing;


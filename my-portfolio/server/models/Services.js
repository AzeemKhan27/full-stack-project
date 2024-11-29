import mongoose from 'mongoose';
import Modules from './Modules.js';

const ServicesSchema = new mongoose.Schema({
  modules: { type: mongoose.Schema.Types.ObjectId, ref: 'Modules' },
});

const Services = mongoose.model('Services', ServicesSchema);
export default Services;

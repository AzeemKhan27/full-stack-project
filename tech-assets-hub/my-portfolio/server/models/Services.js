import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema({
  modules: { type: mongoose.Schema.Types.ObjectId, ref: 'Modules' },
});

const Services = mongoose.model('Services', ServicesSchema);
export default Services;

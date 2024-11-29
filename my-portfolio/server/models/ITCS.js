import mongoose from 'mongoose';

const ITCSSchema = new mongoose.Schema({
  webDevelopment: { type: Boolean, default: false },
  seoDigitalMarketing: { type: Boolean, default: false },
  devopsCloudComputing: { type: Boolean, default: false },
  dsa: { type: Boolean, default: false },
  systemDesign: { type: Boolean, default: false },
});

const ITCS = mongoose.model('ITCS', ITCSSchema);
export default ITCS;

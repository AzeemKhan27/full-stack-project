import mongoose from 'mongoose';

const TeamJoinerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  fullAddress: { type: String, required: true },
  phoneNo: { type: String, required: true },
  emailId: { type: String, required: true },
  qualification: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TeamJoiner = mongoose.model('TeamJoiner', TeamJoinerSchema);

export default TeamJoiner;

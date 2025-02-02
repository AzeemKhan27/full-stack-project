// server/models/PrivacyPolicy.js
import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema({
  policy: { type: String, index: true },
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;
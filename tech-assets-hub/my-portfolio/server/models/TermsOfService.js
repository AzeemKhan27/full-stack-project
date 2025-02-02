// server/models/TermsOfService.js
import mongoose from 'mongoose';

const TermsOfServiceSchema = new mongoose.Schema({
  terms: { type: String, index: true },
});

const TermsOfService = mongoose.model('TermsOfService', TermsOfServiceSchema);

export default TermsOfService;
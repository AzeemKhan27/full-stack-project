import mongoose from 'mongoose';

const ProfessionalDevelopmentSchema = new mongoose.Schema({
  englishSpokenPractice: { type: Boolean, default: false },
  bdeSessions: { type: Boolean, default: false },
  handleSocialMediaProfessionally: { type: Boolean, default: false },
});

const ProfessionalDevelopment = mongoose.model('ProfessionalDevelopment', ProfessionalDevelopmentSchema);
export default ProfessionalDevelopment;

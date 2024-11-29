import mongoose from 'mongoose';

const OtherSkillsSchema = new mongoose.Schema({
  upcoming: { type: Boolean, default: false },
});

const OtherSkills = mongoose.model('OtherSkills', OtherSkillsSchema);
export default OtherSkills;

// models/TeamMember.js
import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: ''},  // image should be optional in case user forget to provide image it should save in database empty string. okay
}); 

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;

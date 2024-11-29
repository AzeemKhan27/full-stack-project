import mongoose from 'mongoose';

const StudentModuleSchema = new mongoose.Schema({
  projectHelpGuidance: { type: Boolean, default: false },
  careerDiscussion: { type: Boolean, default: false },
  projectBuilding: { type: Boolean, default: false },
  onlineCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'OnlineCourse' },
});

const StudentModule = mongoose.model('StudentModule', StudentModuleSchema);
export default StudentModule;

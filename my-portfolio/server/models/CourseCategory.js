import mongoose from 'mongoose';
import ITCS from './ITCS.js';
import ProfessionalDevelopment from './ProfessionalDevelopment.js';
import OtherSkills from './OtherSkills.js';

const CourseCategorySchema = new mongoose.Schema({
  itCs: { type: mongoose.Schema.Types.ObjectId, ref: 'ITCS' },
  professionalDevelopment: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfessionalDevelopment' },
  otherSkills: { type: mongoose.Schema.Types.ObjectId, ref: 'OtherSkills' },
});

const CourseCategory = mongoose.model('CourseCategory', CourseCategorySchema);
export default CourseCategory;

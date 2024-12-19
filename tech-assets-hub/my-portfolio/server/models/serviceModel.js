// server/models/serviceModel.js

import mongoose from 'mongoose';

// Define sub-schemas
const ITCSSchema = new mongoose.Schema({
  webDevelopment: { type: Boolean, default: false },
  seoDigitalMarketing: { type: Boolean, default: false },
  devopsCloudComputing: { type: Boolean, default: false },
  dsa: { type: Boolean, default: false },
  systemDesign: { type: Boolean, default: false },
});

const ProfessionalDevelopmentSchema = new mongoose.Schema({
  englishSpokenPractice: { type: Boolean, default: false },
  bdeSessions: { type: Boolean, default: false },
  handleSocialMediaProfessionally: { type: Boolean, default: false },
});

const OtherSkillsSchema = new mongoose.Schema({
  upcoming: { type: Boolean, default: false },
});

const CourseCategorySchema = new mongoose.Schema({
  itCs: { type: ITCSSchema },
  professionalDevelopment: { type: ProfessionalDevelopmentSchema },
  otherSkills: { type: OtherSkillsSchema },
});

const OnlineCourseSchema = new mongoose.Schema({
  orientation: { type: Boolean, default: false },
  courseCategory: { type: CourseCategorySchema },
  upcomingRecorded: { type: Boolean, default: false },
});

const StudentModuleSchema = new mongoose.Schema({
  projectHelpGuidance: { type: Boolean, default: false },
  careerDiscussion: { type: Boolean, default: false },
  projectBuilding: { type: Boolean, default: false },
  onlineCourse: { type: OnlineCourseSchema },
});

// Main services schema
const servicesSchema = new mongoose.Schema({
  modules: {
    studentModule: { type: StudentModuleSchema },
  },
});

const Service = mongoose.model('Service', servicesSchema);

export default Service;

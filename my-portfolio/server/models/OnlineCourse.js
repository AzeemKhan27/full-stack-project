import mongoose from 'mongoose';

const OnlineCourseSchema = new mongoose.Schema({
  orientation: { type: Boolean, default: false },
  courseCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseCategory' },
  upcomingRecorded: { type: Boolean, default: false },
});

const OnlineCourse = mongoose.model('OnlineCourse', OnlineCourseSchema);
export default OnlineCourse;

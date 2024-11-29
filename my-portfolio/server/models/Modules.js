import mongoose from 'mongoose';
import StudentModule from './StudentModule.js';
import ClientModule from './ClientModule.js';

const ModulesSchema = new mongoose.Schema({
  studentModule: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentModule' },
  clientModule: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientModule' },
});

const Modules = mongoose.model('Modules', ModulesSchema);
export default Modules;

import mongoose from 'mongoose';

const ModulesSchema = new mongoose.Schema({
  studentModule: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentModule' },
  clientModule: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientModule' },
});

const Modules = mongoose.model('Modules', ModulesSchema);
export default Modules;

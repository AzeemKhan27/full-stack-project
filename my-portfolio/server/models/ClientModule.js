import mongoose from 'mongoose';

const ClientModuleSchema = new mongoose.Schema({
  // Define ClientModule-specific fields here as required
});

const ClientModule = mongoose.model('ClientModule', ClientModuleSchema);
export default ClientModule;

import Services from '../models/Services.js';

const servicesService = {
  async createService(serviceData) {
    const service = new Services(serviceData);
    return service.save();
  },
};

export default servicesService;

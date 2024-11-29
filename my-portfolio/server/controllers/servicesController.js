import servicesService from '../services/servicesService.js';

const servicesController = {
  async createService(req, res) {
    try {
      const service = await servicesService.createService(req.body);
      res.status(201).json(service);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ message: 'Failed to create service' });
    }
  },
};

export default servicesController;

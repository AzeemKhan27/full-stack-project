
// server/controllers/servicesController.js
import Service from '../models/serviceModel.js';

const serviceController = {
  async createService(req, res) {
    try {
      const { modules } = req.body;

      // Validate that modules is provided and correctly formatted
      if (!modules || typeof modules !== 'object') {
        return res.status(400).json({ message: 'Invalid payload: modules must be an object.' });
      }

      // Create a new service document
      const newService = new Service({ modules });

      // Save to the database
      const savedService = await newService.save();

      res.status(201).json({ message: 'Service created successfully', service: savedService });
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ message: 'Failed to create service', error: error.message });
    }
  },
};

export default serviceController;

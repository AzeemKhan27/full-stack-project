// server/controllers/termsOfServiceController.js
import TermsOfService from '../models/TermsOfService.js';

const getTermsOfService = async (req, res, next) => {
  try {
    const terms = await TermsOfService.findOne({}, 'terms'); // Query only the 'terms' field
    if (terms) {
      res.json({ terms: terms.terms });
    } else {
      res.status(404).json({ message: 'Terms of service not found' });
    }
  } catch (err) {
    next(err);
  }
};

const createOrUpdateTermsOfService = async (req, res, next) => {
  try {
    const { terms } = req.body;
    let termsOfService = await TermsOfService.findOne();
    if (termsOfService) {
      termsOfService.terms = terms;
      await termsOfService.save();
    } else {
      termsOfService = new TermsOfService({ terms });
      await termsOfService.save();
    }
    res.json({ message: 'Terms of service created/updated successfully' });
  } catch (err) {
    next(err);
  }
};


export { getTermsOfService, createOrUpdateTermsOfService }; 
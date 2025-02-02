// server/controllers/privacyPolicyController.js
import PrivacyPolicy from '../models/PrivacyPolicy.js';

const getPrivacyPolicy = async (req, res, next) => {
  try {
    const policy = await PrivacyPolicy.findOne({}, 'policy'); // Query only the 'policy' field
    if (policy) {
      res.json({ policy: policy.policy });
    } else {
      res.status(404).json({ message: 'Privacy policy not found' });
    }
  } catch (err) {
    next(err);
  }
};

const createOrUpdatePrivacyPolicy = async (req, res, next) => {
  try {
    const { policy } = req.body;
    let privacyPolicy = await PrivacyPolicy.findOne();
    if (privacyPolicy) {
      privacyPolicy.policy = policy;
      await privacyPolicy.save();
    } else {
      privacyPolicy = new PrivacyPolicy({ policy });
      await privacyPolicy.save();
    }
    res.json({ message: 'Privacy policy created/updated successfully' });
  } catch (err) {
    next(err);
  }
};

export { getPrivacyPolicy, createOrUpdatePrivacyPolicy };

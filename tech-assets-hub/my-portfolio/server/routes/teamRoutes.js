// routes/teamRoutes.js
import express from 'express';
import { uploadDisk } from '../utils/multer.js';
import {   
    createTeamMember,
    getAllTeamMembers,
    updateTeamMember,
    deleteTeamMember
 } from '../controllers/teamController.js';

const router = express.Router();

const uploadMiddleware = uploadDisk.fields([
  { name: 'image', maxCount: 1 }, 
])

// Create team member
router.post('/create',uploadMiddleware, createTeamMember);

// Fetch all team members
router.get('/', getAllTeamMembers);

// Update team member
router.put('/update', uploadMiddleware, updateTeamMember);

// Delete team member
router.delete('/delete/:teamId', deleteTeamMember);

export default router;

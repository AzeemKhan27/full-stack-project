// controllers/teamController.js
import TeamMember from '../models/TeamMember.js';
import cloudinary from '../config/cloudinary.js';

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: 'Name, role are required.' });
      }
  
     let imageUrl = '';

     // Upload image to Cloudinary if provided
    if (req.files && req.files.image) {
     const result = await cloudinary.uploader.upload(req.files.image[0].path);
     imageUrl = result.secure_url;
    }

     const newMember = new TeamMember({
      name,
      role,
      image: imageUrl,
    });

    await newMember.save();
    res.status(201).json({ message: 'Team member created successfully', member: newMember });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error });
  }
};

// Fetch all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: 'Error fetching team members', error });
  }
};

// export const updateTeamMember = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, role } = req.body;
//       let image = req.body.image;
  
//       if (req.files && req.files['image']) {
//         image = req.files['image'][0].path;
//       }
  
//       const updatedMember = await TeamMember.findByIdAndUpdate(
//         id,
//         { name, role, image },
//         { new: true }
//       );
  
//       if (!updatedMember) {
//         return res.status(404).json({ message: 'Team member not found' });
//       }
  
//       res.status(200).json({ message: 'Team member updated successfully', member: updatedMember });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating team member', error });
//     }
//   };

export const updateTeamMember = async (req, res) => {
    try {
      const { teamId } = req.body;
      const { name, role } = req.body;
  
      // Find existing team member
      const member = await TeamMember.findById(teamId);
      if (!member) {
        return res.status(404).json({ message: 'Team member not found' });
      }
  
      // Update fields
      member.name = name || member.name;
      member.role = role || member.role;
  
      // Update image if provided
      if (req.files.image) {
        const result = await cloudinary.uploader.upload(req.files.image[0].path);
        member.image = result.secure_url;
      }
  
      await member.save();
      res.status(200).json({ message: 'Team member updated successfully', member });
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(500).json({ message: 'Failed to update team member', error });
    }
  };
  
  export const deleteTeamMember = async (req, res) => {
    try {
      const { teamId } = req.body || req.params || req.query;

      console.log("delete: ", teamId)
  
      const member = await TeamMember.findById(teamId);
      if (!member) {
        return res.status(404).json({ message: 'Team member not found' });
      }
  
      // Delete image from Cloudinary
      const publicId = member.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
  
      await member.deleteOne();
      res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({ message: 'Failed to delete team member', error });
    }
  };
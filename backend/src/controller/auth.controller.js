import {User}  from '../models/user.model.js';

export const authCallback = async (req, res) => {
    try {
        const {id, firstName, lastName, imageUrl} = req.body;

        if (!id || !firstName || !lastName || !imageUrl) {
            return res.status(400).json({message: "Missing required fields"});
        }

        // Check if the user already exists
        const user = await User.findOne({clerkId: id});

        if (!user) {
            // Signup
            await User.create({
                clerkId: id,
                firstName: `${firstName} ${lastName}`,
                imageUrl: imageUrl,
            });
        }

        res.status(200).json({success: true});
    } catch (error) {
        console.error("Error in auth callback:", error);
        res.status(500).json({message: "Internal server error", error});
    }
}
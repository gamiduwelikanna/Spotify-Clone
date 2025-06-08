import {clerkClient} from '@clerk/express';

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId) {
        return res.status(401).send('Unauthorized - you must be logged in.');
    }
}

export const requireAdmin = async(req,res,next) => {
    try{
        const currentUser = await clerkClient.user.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

        if(!isAdmin){
            return res.status(403).json({message: "Unauthorized - you must be an admin."});
        }

    }catch(error)
}
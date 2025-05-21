import { Router } from 'express';
const router = Router();

router.post('/callback', async (req, res) => {
    try{
        const{id, firstName, lastName, imageUrl}=req.body;

        //check if the user already exists
        const user = await User.findOne({clerkId: id})
    }catch (error){

    }

});

export default router;
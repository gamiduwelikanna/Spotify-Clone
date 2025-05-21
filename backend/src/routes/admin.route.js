import { Router } from 'express';
const router = Router();

router.put('/', (req, res) => {
    res.send('Admin route with GET method');
});

export default router;
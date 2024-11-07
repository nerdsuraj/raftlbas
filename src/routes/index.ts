import express from 'express';
const router = express.Router();
import userRoute from './userRoutes';

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);


export default router;

import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/userController';

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/add_user',(req, res, next) => {
    userCtrl.addUser(req, res, next);
});


export default router;

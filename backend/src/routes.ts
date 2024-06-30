import { Router } from 'express';
import { SignOut, Signin, Signup, UpdateUser } from './user/user';
import { authenticateToken } from './middleware';
import event from './event/index';
import registration from './registration/registration';

const router = Router();

router.post('user/signup',Signup);
router.post('/user/signin', Signin);
router.put('/user/updateuser',authenticateToken,UpdateUser);
router.post('/user/signout', authenticateToken, SignOut);
router.use('/event',event);
router.use('/registration',registration)


export default router;
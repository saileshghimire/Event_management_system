import { Router } from 'express';
import { SignOut, Signin, Signup, UpdateUser } from './user';
import { authenticateToken } from './middleware';

const router = Router();

router.post('/user/signup',Signup);
router.post('/user/signin', Signin);
router.post('/user/updateuser',authenticateToken,UpdateUser);
router.post('/user/signout', authenticateToken, SignOut);


export default router;
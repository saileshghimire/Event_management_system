import { Router } from 'express';
import { Signin, Signup, UpdateUser } from './user';
import { authenticateToken } from './middleware';

const router = Router();

router.post('/user/signup',Signup);
router.post('/user/signin', Signin);
router.post('/user/updateuser',authenticateToken,UpdateUser);


export default router;
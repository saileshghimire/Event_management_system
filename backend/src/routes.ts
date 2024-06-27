import { Router } from 'express';
import { Signin, Signup } from './user';

const router = Router();

router.post('/user/signup',Signup);
router.post('/user/signin', Signin);


export default router;
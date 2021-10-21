import { Router } from 'express';
import { AuthenticateUserController } from './Controllers/AuthenticateUserController';

const router = Router();
//new AuthenticateUserController().handle
router.post('/authenticate', new AuthenticateUserController().handle)

export { router };
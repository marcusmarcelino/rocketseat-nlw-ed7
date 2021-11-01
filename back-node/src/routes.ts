import { Router } from 'express';
import { AuthenticateUserController } from './Controllers/AuthenticateUserController';
import { CreateMessageController } from './Controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './Controllers/GetLastThreeMessagesController';
import { ProfileUserController } from './Controllers/ProfileUserController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last3', new GetLastThreeMessagesController().handle)

router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)


export { router };
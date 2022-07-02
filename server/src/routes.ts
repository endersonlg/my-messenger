import { Router } from 'express';

import { CreateMessageController } from './controllers/CreateMessageController';
import { CreateAndAuthenticateUserController } from './controllers/CreateAndAuthenticateUserController';
import { ListMessagesController } from './controllers/ListMessagesController';
import { ListOtherUsersController } from './controllers/ListOtherUsersController';

import { ensureAuthenticatedRest } from './middlewares/ensureAuthenticatedRest';

export const router = Router();

const createAndAuthenticateUserController =
  new CreateAndAuthenticateUserController();
const listOtherUsersController = new ListOtherUsersController();
const createMessageController = new CreateMessageController();
const listMessagesController = new ListMessagesController();

router.post('/users', createAndAuthenticateUserController.handle);

router.post(
  '/messages',
  ensureAuthenticatedRest,
  createMessageController.handle,
);

router.get(
  '/other-users',
  ensureAuthenticatedRest,
  listOtherUsersController.handle,
);

router.get(
  '/messages/:user_sender',
  ensureAuthenticatedRest,
  listMessagesController.handle,
);

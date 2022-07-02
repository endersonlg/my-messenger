import Realm from 'realm';

import { UserSchema } from './schemas/UsersSchema';

export const getRealm = async () =>
  Realm.open({
    path: 'my-messenger',
    schema: [UserSchema],
  });

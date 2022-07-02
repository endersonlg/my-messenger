export const UserSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    id: 'string',
    nickname: 'string',
    image: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};

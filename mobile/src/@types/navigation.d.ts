/* eslint-disable @typescript-eslint/no-empty-interface */

export type StackParamList = {
  CreateUser: undefined;
  ListUsers: undefined;
  Message: {
    id: string;
    nickname: string;
    image: string;
  };
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

import { map } from "nanostores";

import { getUser } from "./services";

interface UserState {
  pending: boolean;
  user: {
    username: string | null;
    password: string | null;
  };
}

export const store = map<UserState>({
  pending: false,
  user: {
    username: null,
    password: null,
  },
});

const getAccount = async (accessToken: string) => {
  store.setKey("pending", true);
  const user = await getUser(accessToken);

  store.set({
    pending: false,
    user,
  });
};

export const actions = {
  getAccount,
};

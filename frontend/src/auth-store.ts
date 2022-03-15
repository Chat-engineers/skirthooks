import { atom, computed } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import AccountsSDK from "@livechat/accounts-sdk";

type TokenAccess = {
  token: string | undefined;
  expiresAt: string | undefined;
};

const accessToken = persistentMap<TokenAccess>("access-token", {
  token: undefined,
  expiresAt: undefined,
});

const pending = atom(false);

export const instance = new AccountsSDK({
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  redirect_uri: window.document.location.href,
});

export const store = computed(
  [accessToken, pending],
  (accessToken, pending) => ({
    accessToken,
    pending,
    isLoggedIn: Boolean(accessToken.token),
  })
);

const authorize = async () => {
  pending.set(true);
  const { token, expiresAt } = accessToken.get();

  if (token && Number(expiresAt) > Date.now()) {
    pending.set(false);

    return;
  }

  const payload = await instance.popup().authorize();

  accessToken.setKey("token", payload.access_token);
  accessToken.setKey(
    "expiresAt",
    String(payload.expires_in * 1000 + Date.now())
  );

  pending.set(false);
};

export const actions = {
  authorize,
};

import { InputField, Loader, TextAreaField } from "@livechat/design-system";
import { useStore } from "@nanostores/react";
import { useEffect, useLayoutEffect } from "preact/hooks";

import { actions, store as authStore } from "./auth-store";
import { actions as userActions, store as userStore } from "./user-store";

const BROKER_URL = import.meta.env["VITE_BROKER_URL"];

export function App() {
  const { isLoggedIn, pending: authPending, accessToken } = useStore(authStore);
  const { user, pending: userPending } = useStore(userStore);

  useLayoutEffect(() => {
    actions.authorize();
  }, []);

  useEffect(() => {
    if (accessToken.token) {
      userActions.getAccount(accessToken.token);
    }
  }, [accessToken.token]);

  if (authPending || userPending) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
        <Loader size="large" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="p-8">
        <h1 className="mb-10 text-header-xl">MQTT Connection Details</h1>

        <div className="w-3/5 mb-10">
          <InputField
            readonly
            labelText="Connect URL"
            description="Use the above URI for mqtt libraries that support it"
            value={`mqtt://${user.username}:${user.password}@${BROKER_URL}:1883`}
          />
        </div>

        <details className="mb-10">
          <summary className="mb-4 cursor-pointer">Advanced</summary>
          <div className="w-3/5 mb-4">
            <InputField
              readonly
              labelText="Broker address"
              description="Note: The broker uses mqtt v3 protocol, listening on port 1883"
              value={BROKER_URL}
            />
          </div>
          <div className="w-3/5 mb-4">
            <InputField readonly labelText="Username" value={user.username} />
          </div>
          <div className="w-3/5 mb-4">
            <InputField readonly labelText="Password" value={user.password} />
          </div>
        </details>

        <h2 className="mb-6 text-header-md">Examples</h2>

        <TextAreaField
          readonly
          labelText="Using HiveMQ client"
          value={`
          mqtt sub -V 3 \\\n --host ${BROKER_URL} \\\n --port 1883 \\\n --topic ${user.username}/# \\\n --user ${user.username} \\\n --password ${user.password}
          `.trim()}
          fieldClassName="font-monospace w-3/5 h-48"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <p className="text-center">
        Please sign in via LiveChat. <br />
        If no popup appears, please click the Sign in button below.
      </p>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-sm"
        onClick={actions.authorize}
      >
        Sign In via LiveChat
      </button>
    </div>
  );
}

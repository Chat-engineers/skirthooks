import JSX = preact.JSX;

declare module "@livechat/accounts-sdk" {
  export interface AccountSDKProps {
    client_id: string;
    redirect_uri: string;
  }

  export interface AuthorizedPayload {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
  }

  export default class AccountsSDK {
    constructor(args: AccountSDKProps);

    options: {
      server_url: string;
    };

    popup(): AccountsSDK;
    redirect(): any;
    authorize(): Promise<AuthorizedPayload>;
    verify(data: AuthorizedPayload): { state: string };
  }
}

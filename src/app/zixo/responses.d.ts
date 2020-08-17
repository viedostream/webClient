export interface ILoginWalletResponse {
  token: string;
  mnemonic?: string;
}

export interface IBalanceSummeryResponse {
  summery: {
    confirmed: number;
    unconfirmed: number;
  };
}

export interface ISendResponse {
  txId: string;
  destAddress: string;
  satoshis: number;
}

export interface IHistoryResponse {
  txId: string;
  satoshis: number;
  date: Date;
}

export interface IAddressResponse {
  address: string;
}

export interface ICreateChannelResponse {
  channelId: string;
  satoshis: number;
  lockSeconds: number;
}

export interface IChannelResponse {
  channelId: string;
  providerUserId?: string;
  clientUserId?: string;
  satoshis: number;
  lockSeconds?: number;
  lockedUntil?: number;
  state?: string;
  guaranteeTxId?: string;
  finalTxId?: string;
  createdAt?: Date;
}

export interface IJoinChannelResponse extends IChannelResponse {}

export interface IChannelPaymentResponse {
  txId?: string;
  paymentId: string;
  channelId: string;
  lastChannelPaymentId?: string;
  satoshis?: number;
  sumSatoshis: number;
  signed: boolean;
  date: Date;
}

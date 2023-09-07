import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type UserInfo = {
  __typename?: 'UserInfo';
  id: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  dateOfBirth: Scalars['String']['output'];
  country: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
  occupation: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type BusinessInfo = {
  __typename?: 'BusinessInfo';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uen: Scalars['String']['output'];
  country: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  address: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type Balance = {
  __typename?: 'Balance';
  amount: Scalars['Float']['output'];
  currency: Currency;
};

export enum Currency {
  USD = 'USD',
  SGD = 'SGD'
}

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerificationSentAt?: Maybe<Scalars['DateTime']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  accountType: AccountType;
  userInfo: UserInfo;
  businessInfo?: Maybe<BusinessInfo>;
  balances: Array<Balance>;
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS'
}

export type PayPalDeposit = {
  __typename?: 'PayPalDeposit';
  id: Scalars['String']['output'];
  paypalCheckoutId?: Maybe<Scalars['String']['output']>;
  currency: Currency;
  amount: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
  user: User;
  fees?: Maybe<Scalars['Float']['output']>;
  status: PayPalStatus;
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export enum PayPalStatus {
  BEFORE_REQUEST = 'BEFORE_REQUEST',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export type PayPalWithdraw = {
  __typename?: 'PayPalWithdraw';
  id: Scalars['String']['output'];
  paypalPaymentId?: Maybe<Scalars['String']['output']>;
  currency: Currency;
  amount: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
  user: User;
  status: PayPalStatus;
  fees?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type MerchantPayment = {
  __typename?: 'MerchantPayment';
  id: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  customerId?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<User>;
  merchantId: Scalars['String']['output'];
  merchant: User;
  amount: Scalars['Float']['output'];
  currency: Currency;
  merchantPaymentStatus: MerchantPaymentStatus;
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export enum MerchantPaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  currency: Currency;
  amount: Scalars['Float']['output'];
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  INTERNAL_TRANSFER_SENT = 'INTERNAL_TRANSFER_SENT',
  INTERNAL_TRANSFER_RECEIVED = 'INTERNAL_TRANSFER_RECEIVED',
  MERCHANT_PAYMENT_RECEIVED = 'MERCHANT_PAYMENT_RECEIVED',
  MERCHANT_PAYMENT_SENT = 'MERCHANT_PAYMENT_SENT',
  WITHDRAWAL_REFUND = 'WITHDRAWAL_REFUND'
}

export type InternalTransfer = {
  __typename?: 'InternalTransfer';
  id: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
  sender: User;
  amount: Scalars['Float']['output'];
  currency: Currency;
  receiverId: Scalars['String']['output'];
  receiver: User;
  note: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
};

export type LoginRequestPayload = {
  __typename?: 'LoginRequestPayload';
  loginToken: Scalars['String']['output'];
};

export type ApiKeyPayload = {
  __typename?: 'ApiKeyPayload';
  apiKey: Scalars['String']['output'];
};

export type TransactionDetails = {
  __typename?: 'TransactionDetails';
  transactionsIn: Array<Transaction>;
  transactionsOut: Array<Transaction>;
};

export type TransactionSummary = {
  __typename?: 'TransactionSummary';
  amountIn: Scalars['Float']['output'];
  amountOut: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  me: User;
  transactions: TransactionDetails;
  getTransactionSummary: TransactionSummary;
  merchantGetQRDetails: MerchantPayment;
  getInternalTransfer: InternalTransfer;
};


export type QueryTransactionsArgs = {
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
  sortOrder?: SortOrder;
  currency: Currency;
};


export type QueryGetTransactionSummaryArgs = {
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
  sortOrder?: SortOrder;
  currency: Currency;
};


export type QueryMerchantGetQrDetailsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetInternalTransferArgs = {
  id: Scalars['String']['input'];
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  registerBusiness: AuthPayload;
  registerIndividual: AuthPayload;
  loginRequest: LoginRequestPayload;
  login: AuthPayload;
  generateApiKey: ApiKeyPayload;
  requestDeposit: PayPalDeposit;
  confirmDeposit: PayPalDeposit;
  requestWithdraw: PayPalWithdraw;
  merchantRequestQR: MerchantPayment;
  merchantPayQR: MerchantPayment;
  makeInternalTransfer: InternalTransfer;
};


export type MutationRegisterBusinessArgs = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  dateOfBirth: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
  occupation: Scalars['String']['input'];
  businessName: Scalars['String']['input'];
  uen: Scalars['String']['input'];
  businessCountry: Scalars['String']['input'];
  businessPostcode: Scalars['String']['input'];
  businessAddress: Scalars['String']['input'];
};


export type MutationRegisterIndividualArgs = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  dateOfBirth: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
  occupation: Scalars['String']['input'];
};


export type MutationLoginRequestArgs = {
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountType;
};


export type MutationLoginArgs = {
  loginToken: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type MutationGenerateApiKeyArgs = {
  label: Scalars['String']['input'];
  type: ApiKeyType;
};


export type MutationRequestDepositArgs = {
  amount: Scalars['Float']['input'];
  currency: Currency;
};


export type MutationConfirmDepositArgs = {
  paypalCheckoutId: Scalars['String']['input'];
};


export type MutationRequestWithdrawArgs = {
  amount: Scalars['Float']['input'];
  currency: Currency;
  paypalEmail: Scalars['String']['input'];
};


export type MutationMerchantRequestQrArgs = {
  orderId: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  currency: Currency;
};


export type MutationMerchantPayQrArgs = {
  id: Scalars['String']['input'];
};


export type MutationMakeInternalTransferArgs = {
  amount: Scalars['Float']['input'];
  currency: Currency;
  toUsername: Scalars['String']['input'];
  note: Scalars['String']['input'];
};

export enum ApiKeyType {
  CREATE_PAYMENT_QR = 'CREATE_PAYMENT_QR'
}

export type MerchantGetQrDetailsQueryVariables = Exact<{
  merchantGetQrDetailsId: Scalars['String']['input'];
}>;


export type MerchantGetQrDetailsQuery = { __typename?: 'Query', merchantGetQRDetails: { __typename?: 'MerchantPayment', amount: number, currency: Currency, merchantId: string, orderId: string } };

export type GetTransactionSummaryQueryVariables = Exact<{
  fromDate: Scalars['DateTime']['input'];
  currency: Currency;
  toDate: Scalars['DateTime']['input'];
}>;


export type GetTransactionSummaryQuery = { __typename?: 'Query', getTransactionSummary: { __typename?: 'TransactionSummary', amountIn: number, amountOut: number } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, email: string, emailVerificationSentAt?: any | null, emailVerified: boolean, accountType: AccountType, updatedAt: any, createdAt: any, userInfo: { __typename?: 'UserInfo', id: string, firstName: string, lastName: string, dateOfBirth: string, country: string, postcode: string, occupation: string, updatedAt: any, createdAt: any }, balances: Array<{ __typename?: 'Balance', amount: number, currency: Currency }>, businessInfo?: { __typename?: 'BusinessInfo', id: string, name: string, uen: string, country: string, postalCode: string, address: string, updatedAt: any, createdAt: any } | null } };

export type TransactionFullQueryVariables = Exact<{
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
  currency: Currency;
}>;


export type TransactionFullQuery = { __typename?: 'Query', transactions: { __typename?: 'TransactionDetails', transactionsIn: Array<{ __typename?: 'Transaction', id: string, userId: string, currency: Currency, amount: number, type: TransactionType, updatedAt: any, createdAt: any }>, transactionsOut: Array<{ __typename?: 'Transaction', id: string, userId: string, currency: Currency, amount: number, type: TransactionType, updatedAt: any, createdAt: any }> } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type ConfirmDepositMutationVariables = Exact<{
  paypalCheckoutId: Scalars['String']['input'];
}>;


export type ConfirmDepositMutation = { __typename?: 'Mutation', confirmDeposit: { __typename?: 'PayPalDeposit', id: string, paypalCheckoutId?: string | null, currency: Currency, amount: number, userId: string, fees?: number | null, status: PayPalStatus, updatedAt: any, createdAt: any } };

export type LoginMutationVariables = Exact<{
  loginToken: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string } };

export type MakeInternalTransferMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
  toUsername: Scalars['String']['input'];
  note: Scalars['String']['input'];
}>;


export type MakeInternalTransferMutation = { __typename?: 'Mutation', makeInternalTransfer: { __typename?: 'InternalTransfer', amount: number, createdAt: any, currency: Currency, id: string, note: string, receiverId: string, senderId: string, updatedAt: any } };

export type LoginRequestMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountType;
}>;


export type LoginRequestMutation = { __typename?: 'Mutation', loginRequest: { __typename?: 'LoginRequestPayload', loginToken: string } };

export type RegisterBusinessMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  dateOfBirth: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
  occupation: Scalars['String']['input'];
  businessName: Scalars['String']['input'];
  uen: Scalars['String']['input'];
  businessCountry: Scalars['String']['input'];
  businessPostcode: Scalars['String']['input'];
  businessAddress: Scalars['String']['input'];
}>;


export type RegisterBusinessMutation = { __typename?: 'Mutation', registerBusiness: { __typename?: 'AuthPayload', accessToken: string } };

export type RegisterIndividualMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  dateOfBirth: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
  occupation: Scalars['String']['input'];
}>;


export type RegisterIndividualMutation = { __typename?: 'Mutation', registerIndividual: { __typename?: 'AuthPayload', accessToken: string } };

export type RequestWithdrawMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
  paypalEmail: Scalars['String']['input'];
}>;


export type RequestWithdrawMutation = { __typename?: 'Mutation', requestWithdraw: { __typename?: 'PayPalWithdraw', id: string, paypalPaymentId?: string | null, currency: Currency, amount: number, userId: string, status: PayPalStatus, fees?: number | null, updatedAt: any, createdAt: any } };

export type RequestDepositMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
}>;


export type RequestDepositMutation = { __typename?: 'Mutation', requestDeposit: { __typename?: 'PayPalDeposit', id: string, paypalCheckoutId?: string | null, currency: Currency, amount: number, userId: string, fees?: number | null, status: PayPalStatus, updatedAt: any, createdAt: any } };

export type GenerateApiKeyMutationVariables = Exact<{
  label: Scalars['String']['input'];
  type: ApiKeyType;
}>;


export type GenerateApiKeyMutation = { __typename?: 'Mutation', generateApiKey: { __typename?: 'ApiKeyPayload', apiKey: string } };


export const MerchantGetQrDetailsDocument = gql`
    query MerchantGetQRDetails($merchantGetQrDetailsId: String!) {
  merchantGetQRDetails(id: $merchantGetQrDetailsId) {
    amount
    currency
    merchantId
    orderId
  }
}
    `;

/**
 * __useMerchantGetQrDetailsQuery__
 *
 * To run a query within a React component, call `useMerchantGetQrDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantGetQrDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantGetQrDetailsQuery({
 *   variables: {
 *      merchantGetQrDetailsId: // value for 'merchantGetQrDetailsId'
 *   },
 * });
 */
export function useMerchantGetQrDetailsQuery(baseOptions: Apollo.QueryHookOptions<MerchantGetQrDetailsQuery, MerchantGetQrDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MerchantGetQrDetailsQuery, MerchantGetQrDetailsQueryVariables>(MerchantGetQrDetailsDocument, options);
      }
export function useMerchantGetQrDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantGetQrDetailsQuery, MerchantGetQrDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MerchantGetQrDetailsQuery, MerchantGetQrDetailsQueryVariables>(MerchantGetQrDetailsDocument, options);
        }
export type MerchantGetQrDetailsQueryHookResult = ReturnType<typeof useMerchantGetQrDetailsQuery>;
export type MerchantGetQrDetailsLazyQueryHookResult = ReturnType<typeof useMerchantGetQrDetailsLazyQuery>;
export type MerchantGetQrDetailsQueryResult = Apollo.QueryResult<MerchantGetQrDetailsQuery, MerchantGetQrDetailsQueryVariables>;
export const GetTransactionSummaryDocument = gql`
    query GetTransactionSummary($fromDate: DateTime!, $currency: Currency!, $toDate: DateTime!) {
  getTransactionSummary(fromDate: $fromDate, currency: $currency, toDate: $toDate) {
    amountIn
    amountOut
  }
}
    `;

/**
 * __useGetTransactionSummaryQuery__
 *
 * To run a query within a React component, call `useGetTransactionSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionSummaryQuery({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *      currency: // value for 'currency'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useGetTransactionSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionSummaryQuery, GetTransactionSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionSummaryQuery, GetTransactionSummaryQueryVariables>(GetTransactionSummaryDocument, options);
      }
export function useGetTransactionSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionSummaryQuery, GetTransactionSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionSummaryQuery, GetTransactionSummaryQueryVariables>(GetTransactionSummaryDocument, options);
        }
export type GetTransactionSummaryQueryHookResult = ReturnType<typeof useGetTransactionSummaryQuery>;
export type GetTransactionSummaryLazyQueryHookResult = ReturnType<typeof useGetTransactionSummaryLazyQuery>;
export type GetTransactionSummaryQueryResult = Apollo.QueryResult<GetTransactionSummaryQuery, GetTransactionSummaryQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    emailVerificationSentAt
    emailVerified
    accountType
    updatedAt
    createdAt
    userInfo {
      id
      firstName
      lastName
      dateOfBirth
      country
      postcode
      occupation
      updatedAt
      createdAt
    }
    balances {
      amount
      currency
    }
    businessInfo {
      id
      name
      uen
      country
      postalCode
      address
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TransactionFullDocument = gql`
    query TransactionFull($fromDate: DateTime!, $toDate: DateTime!, $currency: Currency!) {
  transactions(fromDate: $fromDate, toDate: $toDate, currency: $currency) {
    transactionsIn {
      id
      userId
      currency
      amount
      type
      updatedAt
      createdAt
    }
    transactionsOut {
      id
      userId
      currency
      amount
      type
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useTransactionFullQuery__
 *
 * To run a query within a React component, call `useTransactionFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionFullQuery({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useTransactionFullQuery(baseOptions: Apollo.QueryHookOptions<TransactionFullQuery, TransactionFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionFullQuery, TransactionFullQueryVariables>(TransactionFullDocument, options);
      }
export function useTransactionFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionFullQuery, TransactionFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionFullQuery, TransactionFullQueryVariables>(TransactionFullDocument, options);
        }
export type TransactionFullQueryHookResult = ReturnType<typeof useTransactionFullQuery>;
export type TransactionFullLazyQueryHookResult = ReturnType<typeof useTransactionFullLazyQuery>;
export type TransactionFullQueryResult = Apollo.QueryResult<TransactionFullQuery, TransactionFullQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const ConfirmDepositDocument = gql`
    mutation ConfirmDeposit($paypalCheckoutId: String!) {
  confirmDeposit(paypalCheckoutId: $paypalCheckoutId) {
    id
    paypalCheckoutId
    currency
    amount
    userId
    fees
    status
    updatedAt
    createdAt
  }
}
    `;
export type ConfirmDepositMutationFn = Apollo.MutationFunction<ConfirmDepositMutation, ConfirmDepositMutationVariables>;

/**
 * __useConfirmDepositMutation__
 *
 * To run a mutation, you first call `useConfirmDepositMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmDepositMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmDepositMutation, { data, loading, error }] = useConfirmDepositMutation({
 *   variables: {
 *      paypalCheckoutId: // value for 'paypalCheckoutId'
 *   },
 * });
 */
export function useConfirmDepositMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmDepositMutation, ConfirmDepositMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmDepositMutation, ConfirmDepositMutationVariables>(ConfirmDepositDocument, options);
      }
export type ConfirmDepositMutationHookResult = ReturnType<typeof useConfirmDepositMutation>;
export type ConfirmDepositMutationResult = Apollo.MutationResult<ConfirmDepositMutation>;
export type ConfirmDepositMutationOptions = Apollo.BaseMutationOptions<ConfirmDepositMutation, ConfirmDepositMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginToken: String!, $otp: String!) {
  login(loginToken: $loginToken, otp: $otp) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginToken: // value for 'loginToken'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MakeInternalTransferDocument = gql`
    mutation MakeInternalTransfer($amount: Float!, $currency: Currency!, $toUsername: String!, $note: String!) {
  makeInternalTransfer(
    amount: $amount
    currency: $currency
    toUsername: $toUsername
    note: $note
  ) {
    amount
    createdAt
    currency
    id
    note
    receiverId
    senderId
    updatedAt
  }
}
    `;
export type MakeInternalTransferMutationFn = Apollo.MutationFunction<MakeInternalTransferMutation, MakeInternalTransferMutationVariables>;

/**
 * __useMakeInternalTransferMutation__
 *
 * To run a mutation, you first call `useMakeInternalTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeInternalTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeInternalTransferMutation, { data, loading, error }] = useMakeInternalTransferMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *      toUsername: // value for 'toUsername'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useMakeInternalTransferMutation(baseOptions?: Apollo.MutationHookOptions<MakeInternalTransferMutation, MakeInternalTransferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeInternalTransferMutation, MakeInternalTransferMutationVariables>(MakeInternalTransferDocument, options);
      }
export type MakeInternalTransferMutationHookResult = ReturnType<typeof useMakeInternalTransferMutation>;
export type MakeInternalTransferMutationResult = Apollo.MutationResult<MakeInternalTransferMutation>;
export type MakeInternalTransferMutationOptions = Apollo.BaseMutationOptions<MakeInternalTransferMutation, MakeInternalTransferMutationVariables>;
export const LoginRequestDocument = gql`
    mutation LoginRequest($usernameOrEmail: String!, $password: String!, $accountType: AccountType!) {
  loginRequest(
    usernameOrEmail: $usernameOrEmail
    password: $password
    accountType: $accountType
  ) {
    loginToken
  }
}
    `;
export type LoginRequestMutationFn = Apollo.MutationFunction<LoginRequestMutation, LoginRequestMutationVariables>;

/**
 * __useLoginRequestMutation__
 *
 * To run a mutation, you first call `useLoginRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginRequestMutation, { data, loading, error }] = useLoginRequestMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *      accountType: // value for 'accountType'
 *   },
 * });
 */
export function useLoginRequestMutation(baseOptions?: Apollo.MutationHookOptions<LoginRequestMutation, LoginRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginRequestMutation, LoginRequestMutationVariables>(LoginRequestDocument, options);
      }
export type LoginRequestMutationHookResult = ReturnType<typeof useLoginRequestMutation>;
export type LoginRequestMutationResult = Apollo.MutationResult<LoginRequestMutation>;
export type LoginRequestMutationOptions = Apollo.BaseMutationOptions<LoginRequestMutation, LoginRequestMutationVariables>;
export const RegisterBusinessDocument = gql`
    mutation RegisterBusiness($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $dateOfBirth: String!, $country: String!, $postcode: String!, $occupation: String!, $businessName: String!, $uen: String!, $businessCountry: String!, $businessPostcode: String!, $businessAddress: String!) {
  registerBusiness(
    username: $username
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    dateOfBirth: $dateOfBirth
    country: $country
    postcode: $postcode
    occupation: $occupation
    businessName: $businessName
    uen: $uen
    businessCountry: $businessCountry
    businessPostcode: $businessPostcode
    businessAddress: $businessAddress
  ) {
    accessToken
  }
}
    `;
export type RegisterBusinessMutationFn = Apollo.MutationFunction<RegisterBusinessMutation, RegisterBusinessMutationVariables>;

/**
 * __useRegisterBusinessMutation__
 *
 * To run a mutation, you first call `useRegisterBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerBusinessMutation, { data, loading, error }] = useRegisterBusinessMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      country: // value for 'country'
 *      postcode: // value for 'postcode'
 *      occupation: // value for 'occupation'
 *      businessName: // value for 'businessName'
 *      uen: // value for 'uen'
 *      businessCountry: // value for 'businessCountry'
 *      businessPostcode: // value for 'businessPostcode'
 *      businessAddress: // value for 'businessAddress'
 *   },
 * });
 */
export function useRegisterBusinessMutation(baseOptions?: Apollo.MutationHookOptions<RegisterBusinessMutation, RegisterBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterBusinessMutation, RegisterBusinessMutationVariables>(RegisterBusinessDocument, options);
      }
export type RegisterBusinessMutationHookResult = ReturnType<typeof useRegisterBusinessMutation>;
export type RegisterBusinessMutationResult = Apollo.MutationResult<RegisterBusinessMutation>;
export type RegisterBusinessMutationOptions = Apollo.BaseMutationOptions<RegisterBusinessMutation, RegisterBusinessMutationVariables>;
export const RegisterIndividualDocument = gql`
    mutation RegisterIndividual($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $dateOfBirth: String!, $country: String!, $postcode: String!, $occupation: String!) {
  registerIndividual(
    username: $username
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    dateOfBirth: $dateOfBirth
    country: $country
    postcode: $postcode
    occupation: $occupation
  ) {
    accessToken
  }
}
    `;
export type RegisterIndividualMutationFn = Apollo.MutationFunction<RegisterIndividualMutation, RegisterIndividualMutationVariables>;

/**
 * __useRegisterIndividualMutation__
 *
 * To run a mutation, you first call `useRegisterIndividualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterIndividualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerIndividualMutation, { data, loading, error }] = useRegisterIndividualMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      country: // value for 'country'
 *      postcode: // value for 'postcode'
 *      occupation: // value for 'occupation'
 *   },
 * });
 */
export function useRegisterIndividualMutation(baseOptions?: Apollo.MutationHookOptions<RegisterIndividualMutation, RegisterIndividualMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterIndividualMutation, RegisterIndividualMutationVariables>(RegisterIndividualDocument, options);
      }
export type RegisterIndividualMutationHookResult = ReturnType<typeof useRegisterIndividualMutation>;
export type RegisterIndividualMutationResult = Apollo.MutationResult<RegisterIndividualMutation>;
export type RegisterIndividualMutationOptions = Apollo.BaseMutationOptions<RegisterIndividualMutation, RegisterIndividualMutationVariables>;
export const RequestWithdrawDocument = gql`
    mutation RequestWithdraw($amount: Float!, $currency: Currency!, $paypalEmail: String!) {
  requestWithdraw(amount: $amount, currency: $currency, paypalEmail: $paypalEmail) {
    id
    paypalPaymentId
    currency
    amount
    userId
    status
    fees
    updatedAt
    createdAt
  }
}
    `;
export type RequestWithdrawMutationFn = Apollo.MutationFunction<RequestWithdrawMutation, RequestWithdrawMutationVariables>;

/**
 * __useRequestWithdrawMutation__
 *
 * To run a mutation, you first call `useRequestWithdrawMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestWithdrawMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestWithdrawMutation, { data, loading, error }] = useRequestWithdrawMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *      paypalEmail: // value for 'paypalEmail'
 *   },
 * });
 */
export function useRequestWithdrawMutation(baseOptions?: Apollo.MutationHookOptions<RequestWithdrawMutation, RequestWithdrawMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestWithdrawMutation, RequestWithdrawMutationVariables>(RequestWithdrawDocument, options);
      }
export type RequestWithdrawMutationHookResult = ReturnType<typeof useRequestWithdrawMutation>;
export type RequestWithdrawMutationResult = Apollo.MutationResult<RequestWithdrawMutation>;
export type RequestWithdrawMutationOptions = Apollo.BaseMutationOptions<RequestWithdrawMutation, RequestWithdrawMutationVariables>;
export const RequestDepositDocument = gql`
    mutation RequestDeposit($amount: Float!, $currency: Currency!) {
  requestDeposit(amount: $amount, currency: $currency) {
    id
    paypalCheckoutId
    currency
    amount
    userId
    fees
    status
    updatedAt
    createdAt
  }
}
    `;
export type RequestDepositMutationFn = Apollo.MutationFunction<RequestDepositMutation, RequestDepositMutationVariables>;

/**
 * __useRequestDepositMutation__
 *
 * To run a mutation, you first call `useRequestDepositMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestDepositMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestDepositMutation, { data, loading, error }] = useRequestDepositMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useRequestDepositMutation(baseOptions?: Apollo.MutationHookOptions<RequestDepositMutation, RequestDepositMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestDepositMutation, RequestDepositMutationVariables>(RequestDepositDocument, options);
      }
export type RequestDepositMutationHookResult = ReturnType<typeof useRequestDepositMutation>;
export type RequestDepositMutationResult = Apollo.MutationResult<RequestDepositMutation>;
export type RequestDepositMutationOptions = Apollo.BaseMutationOptions<RequestDepositMutation, RequestDepositMutationVariables>;
export const GenerateApiKeyDocument = gql`
    mutation GenerateApiKey($label: String!, $type: ApiKeyType!) {
  generateApiKey(label: $label, type: $type) {
    apiKey
  }
}
    `;
export type GenerateApiKeyMutationFn = Apollo.MutationFunction<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>;

/**
 * __useGenerateApiKeyMutation__
 *
 * To run a mutation, you first call `useGenerateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateApiKeyMutation, { data, loading, error }] = useGenerateApiKeyMutation({
 *   variables: {
 *      label: // value for 'label'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGenerateApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>(GenerateApiKeyDocument, options);
      }
export type GenerateApiKeyMutationHookResult = ReturnType<typeof useGenerateApiKeyMutation>;
export type GenerateApiKeyMutationResult = Apollo.MutationResult<GenerateApiKeyMutation>;
export type GenerateApiKeyMutationOptions = Apollo.BaseMutationOptions<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>;
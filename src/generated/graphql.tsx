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

export type InternalTransfer = {
  __typename?: 'InternalTransfer';
  id: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  currency: Currency;
  receiverId: Scalars['String']['output'];
  note: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  me: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerBusiness: AuthPayload;
  registerIndividual: AuthPayload;
  login: AuthPayload;
  requestDeposit: PayPalDeposit;
  confirmDeposit: PayPalDeposit;
  requestWithdraw: PayPalWithdraw;
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


export type MutationLoginArgs = {
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountType;
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


export type MutationMakeInternalTransferArgs = {
  amount: Scalars['Float']['input'];
  currency: Currency;
  toUsername: Scalars['String']['input'];
  note: Scalars['String']['input'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, email: string, emailVerificationSentAt?: any | null, emailVerified: boolean, accountType: AccountType, updatedAt: any, createdAt: any, userInfo: { __typename?: 'UserInfo', id: string, firstName: string, lastName: string, dateOfBirth: string, country: string, postcode: string, occupation: string, updatedAt: any, createdAt: any } } };

export type ConfirmDepositMutationVariables = Exact<{
  paypalCheckoutId: Scalars['String']['input'];
}>;


export type ConfirmDepositMutation = { __typename?: 'Mutation', confirmDeposit: { __typename?: 'PayPalDeposit', id: string, paypalCheckoutId?: string | null, currency: Currency, amount: number, userId: string, fees?: number | null, status: PayPalStatus, updatedAt: any, createdAt: any } };

export type RequestWithdrawMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
  paypalEmail: Scalars['String']['input'];
}>;


export type RequestWithdrawMutation = { __typename?: 'Mutation', requestWithdraw: { __typename?: 'PayPalWithdraw', id: string, paypalPaymentId?: string | null, currency: Currency, amount: number, userId: string, status: PayPalStatus, fees?: number | null, updatedAt: any, createdAt: any } };

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

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountType;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string } };

export type RequestDepositMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
}>;


export type RequestDepositMutation = { __typename?: 'Mutation', requestDeposit: { __typename?: 'PayPalDeposit', id: string, paypalCheckoutId?: string | null, currency: Currency, amount: number, userId: string, fees?: number | null, status: PayPalStatus, updatedAt: any, createdAt: any } };

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
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!, $accountType: AccountType!) {
  login(
    usernameOrEmail: $usernameOrEmail
    password: $password
    accountType: $accountType
  ) {
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *      accountType: // value for 'accountType'
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
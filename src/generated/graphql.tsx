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

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerificationSentAt?: Maybe<Scalars['DateTime']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  accountType: AccountType;
  userInfo: UserInfo;
  businessInfo: BusinessInfo;
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

export enum Currency {
  USD = 'USD',
  SGD = 'SGD'
}

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

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  accountType: AccountType;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string } };

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
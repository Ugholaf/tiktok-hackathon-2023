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
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerBusiness: AuthPayload;
  registerIndividual: AuthPayload;
  login: AuthPayload;
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

export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS'
}

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
  businessName: Scalars['String']['input'];
  uen: Scalars['String']['input'];
  businessCountry: Scalars['String']['input'];
  businessPostcode: Scalars['String']['input'];
  businessAddress: Scalars['String']['input'];
}>;


export type RegisterIndividualMutation = { __typename?: 'Mutation', registerBusiness: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string } };


export const RegisterIndividualDocument = gql`
    mutation RegisterIndividual($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $dateOfBirth: String!, $country: String!, $postcode: String!, $occupation: String!, $businessName: String!, $uen: String!, $businessCountry: String!, $businessPostcode: String!, $businessAddress: String!) {
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
    refreshToken
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
 *      businessName: // value for 'businessName'
 *      uen: // value for 'uen'
 *      businessCountry: // value for 'businessCountry'
 *      businessPostcode: // value for 'businessPostcode'
 *      businessAddress: // value for 'businessAddress'
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
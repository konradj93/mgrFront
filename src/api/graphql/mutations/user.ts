import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation signInUser(
  $email: String!, 
  $password: String!,
   $passwordConfirmation: String!,
   $firstName: String,
   $lastName: String,
   $role: String,
   ) {
    createUser(input: {
        attributes: {
            email: $email,
            password: $password,
            passwordConfirmation: $passwordConfirmation,
            firstName: $firstName,
            lastName: $lastName,
            role: $role
        } 
     
    }) {
        id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser( $id: Int! ) {
    deleteUser(input: { 
     id: $id
    }) {
        id
    }
  }
`;


export const UDPATE_USER = gql`
  mutation deleteUser( 
  $id: Int!,
   $email: String!, 
  $password: String!,
   $passwordConfirmation: String!,
   $firstName: String,
   $lastName: String,
   $role: String
   ) {
    updateUser(input: { 
     id: $id
     email: $email,
        password: $password,
        passwordConfirmation: $passwordConfirmation,
        firstName: $firstName,
        lastName: $lastName,
        role: $role
    }) {
        id
    }
  }
`;

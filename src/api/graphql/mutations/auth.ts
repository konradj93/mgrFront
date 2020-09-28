import { gql } from "apollo-boost";




// mutation
export const SIGN_IN_USER = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
        role
    }
  }
`;

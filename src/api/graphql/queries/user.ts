import {gql} from "apollo-boost";

export const GET_USERS = gql`
  query GetUsers($limit: Int) {
    users(limit: $limit) {
      id
      body
      title
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetPosts($limit: Int) {
    user(limit: $limit) {
      id
      body
      title
      createdAt
    }
  }
`;

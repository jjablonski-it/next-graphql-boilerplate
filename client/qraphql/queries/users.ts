import { gql } from "@apollo/client";

export default gql`
  {
    users {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

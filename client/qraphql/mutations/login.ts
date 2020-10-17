import { gql } from "@apollo/client";

export default gql`
  mutation Login($input: UsernamePassword!) {
    login(input: $input) {
      authToken
      error {
        field
        message
      }
    }
  }
`;

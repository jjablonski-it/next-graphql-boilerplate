import { gql } from "@apollo/client";

export default gql`
  mutation Register($input: UsernamePassword!) {
    register(input: $input) {
      success
      error {
        field
        message
      }
    }
  }
`;

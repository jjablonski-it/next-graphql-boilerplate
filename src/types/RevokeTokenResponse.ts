import { Field, ObjectType } from "type-graphql";
import ErrorObject from "./ErrorObject";

@ObjectType()
class RevokeTokenResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error?: ErrorObject;
}

export default RevokeTokenResponse;

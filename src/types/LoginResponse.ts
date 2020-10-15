import { Field, ObjectType } from "type-graphql";
import ErrorObject from "./ErrorObject";

@ObjectType()
class LoginResponse {
  @Field()
  authToken?: String;
  @Field({ nullable: true })
  error?: ErrorObject;
}

export default LoginResponse;

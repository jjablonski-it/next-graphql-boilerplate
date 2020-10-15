import { Field, ObjectType } from "type-graphql";
import ErrorObject from "./ErrorObject";

@ObjectType()
class RegisterResponse {
  @Field()
  created: boolean;
  @Field({ nullable: true })
  error?: ErrorObject;
}

export default RegisterResponse;

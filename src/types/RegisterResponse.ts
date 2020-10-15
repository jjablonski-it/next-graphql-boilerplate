import { Field, ObjectType } from "type-graphql";
import ErrorObject from "./ErrorObject";

@ObjectType()
class RegisterResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: ErrorObject;
}

export default RegisterResponse;

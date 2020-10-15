import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ErrorObject {
  @Field()
  field: String;
  @Field()
  message: String;
}

export default ErrorObject;

import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ErrorObject {
  @Field({ nullable: true })
  field?: String;
  @Field()
  message: String;
}

export default ErrorObject;

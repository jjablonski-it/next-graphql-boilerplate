import { Field, InputType } from "type-graphql";

@InputType()
class UsernamePassword {
  @Field()
  name: string;
  @Field()
  password: string;
}

export default UsernamePassword;

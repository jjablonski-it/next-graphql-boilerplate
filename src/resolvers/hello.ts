import { Query, Resolver } from "type-graphql";

@Resolver()
export default class HelloResolver {
  @Query(() => String!)
  hello() {
    return "hello world from type-graphql schema";
  }
}

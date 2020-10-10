import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/User";

@Resolver()
export default class UserResolver {
  @Query(() => [User]!)
  async users() {
    return await User.find();
  }

  @Mutation(() => User!)
  async createUser(@Arg("name") name: string) {
    const user = new User();
    user.name = name;

    try {
      await user.save();
    } catch (e) {
      throw e;
    }
    return user;
  }
}

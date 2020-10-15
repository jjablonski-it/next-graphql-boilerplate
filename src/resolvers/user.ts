import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { compare, hash } from "bcrypt";

import User from "../entities/User";
import UsernamePassword from "../types/UsernamePassword";
import LoginResponse from "../types/LoginResponse";
import RegisterResponse from "../types/RegisterResponse";
import ErrorObject from "../types/ErrorObject";

@Resolver()
export default class UserResolver {
  @Query(() => [User]!)
  async users() {
    return await User.find();
  }

  @Mutation(() => RegisterResponse!)
  async register(
    @Arg("input") { name, password }: UsernamePassword
  ): Promise<RegisterResponse> {
    const hashedPassword = await hash(password, 10);
    let error: ErrorObject | null = null;

    let user = await User.insert({ name, password: hashedPassword }).catch(
      () => {
        error = { field: "username", message: "username taken" };
      }
    );

    if (error) return { created: false, error };

    return { created: !!user };
  }

  @Mutation(() => LoginResponse!)
  async login(
    @Arg("input") { name, password }: UsernamePassword
  ): Promise<LoginResponse> {
    const user = await User.findOne({ name });
    if (!user) return { error: { field: "field", message: "wrong username" } };

    const valid = await compare(password, user.password);
    if (!valid)
      return { error: { field: "password", message: "wrong password" } };

    return { authToken: "token" };
  }
}

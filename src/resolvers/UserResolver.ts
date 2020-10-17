import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { compare, hash } from "bcrypt";

import User from "../entities/User";
import UsernamePassword from "../types/UsernamePassword";
import LoginResponse from "../types/LoginResponse";
import RegisterResponse from "../types/RegisterResponse";
import ErrorObject from "../types/ErrorObject";
import { createAuthToken, createRefreshToken } from "../auth/tokens";
import isAuth from "../middleware/isAuth";
import ContextType from "../types/ContextType";
import setCookie from "../auth/setCookie";
import RevokeTokenResponse from "../types/RevokeTokenResponse";

@Resolver()
export default class UserResolver {
  @Query(() => [User!]!)
  async users() {
    return await User.find();
  }

  @Query(() => User!, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: ContextType) {
    const userId = payload?.userId;
    if (!userId) return null;

    const user = await User.findOne({ id: userId });
    if (!user) return null;

    return user;
  }

  @Mutation(() => RegisterResponse!)
  async register(
    @Arg("input") { name, password }: UsernamePassword
  ): Promise<RegisterResponse> {
    const hashedPassword = await hash(password, 10);
    let error: ErrorObject | null = null;

    let user = await User.insert({ name, password: hashedPassword }).catch(
      () => {
        error = { field: "name", message: "username taken" };
      }
    );

    if (error) return { success: false, error };

    return { success: !!user };
  }

  @Mutation(() => LoginResponse!)
  async login(
    @Arg("input") { name, password }: UsernamePassword,
    @Ctx() { res }: ContextType
  ): Promise<LoginResponse> {
    const user = await User.findOne({ name });
    if (!user) return { error: { field: "name", message: "wrong username" } };

    const valid = await compare(password, user.password);
    if (!valid)
      return { error: { field: "password", message: "wrong password" } };

    setCookie(res, createRefreshToken(user));

    const authToken = createAuthToken(user);

    return { authToken };
  }

  @Mutation(() => RevokeTokenResponse!)
  @UseMiddleware(isAuth)
  async revokeToken(
    @Ctx() { payload }: ContextType
  ): Promise<RevokeTokenResponse> {
    const userId = payload?.userId;
    if (!userId)
      return { success: false, error: { message: "token not provided" } };

    const user = await User.findOne(userId);
    if (!user)
      return { success: false, error: { message: "user does not exist" } };

    user.tokenVersion = user.tokenVersion + 1;

    try {
      await user.save();
    } catch (e) {
      return { success: false, error: { message: "error while saving user" } };
    }

    return { success: true };
  }
}

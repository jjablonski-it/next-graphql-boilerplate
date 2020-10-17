import React, { ReactElement } from "react";
import QuickForm from "../components/QuickForm";
import login from "../qraphql/mutations/login";
import { setToken } from "../utils/authToken";

interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <div>
      <QuickForm
        name="Login"
        fields={["name", "password"]}
        mutation={login}
        onSubmit={(data, router) => {
          const { authToken, error } = data.login;
          if (authToken) {
            setToken(authToken);
            router.push("/me");
          }
          return error;
        }}
      />
    </div>
  );
}

import React, { ReactElement } from "react";
import QuickForm from "../components/QuickForm";
import register from "../qraphql/mutations/register";
import { setToken } from "../utils/authToken";

interface Props {}

export default function Register({}: Props): ReactElement {
  return (
    <div>
      <QuickForm
        name="Register"
        fields={["name", "password"]}
        mutation={register}
        onSubmit={(data, router) => {
          const { success, error } = data.register;
          if (success) router.push("/login");
          return error;
        }}
      />
    </div>
  );
}

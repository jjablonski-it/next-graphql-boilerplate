import React, { ReactElement } from "react";
import QuickForm from "../components/QuickForm";
import { RegisterDocument } from "../src/generated/graphql";

interface Props {}

export default function Register({}: Props): ReactElement {
  return (
    <div>
      <QuickForm
        name="Register"
        fields={["name", "password"]}
        mutation={RegisterDocument}
        onSubmit={(data, router) => {
          const { success, error } = data.register;
          if (success) router.push("/login");
          return error;
        }}
      />
    </div>
  );
}

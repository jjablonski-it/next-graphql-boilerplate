import { Button, FormControl, TextField } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";

export default function Login() {
  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={() => {
          console.log("submit");
        }}
      >
        {() => (
          <Form autoComplete="off">
            <InputField name="name" />
            <InputField name="password" />
            <Button type="submit" fullWidth color="primary" variant="contained">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

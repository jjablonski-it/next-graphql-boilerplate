import { useMutation } from "@apollo/client";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import InputField from "../components/InputField";
import login from "../qraphql/mutations/login";
import { setToken } from "../utils/authToken";

export default function Login() {
  const [loginMut] = useMutation(login);
  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          console.log("submit", values);
          setSubmitting(true);

          const { data } = await loginMut({
            variables: { input: values },
          }).catch((e) => {
            throw e;
          });
          setSubmitting(false);

          console.log(data);

          const { authToken, error } = data.login;
          if (authToken) {
            setToken(authToken);
            router.push("/me");
          }

          if (error) setErrors({ [error.field]: error.message });
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <InputField name="name" />
            <InputField name="password" />
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color={"primary"} />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

import { Box, FormControl, TextField, TextFieldProps } from "@material-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes, ReactElement } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  inputProps?: TextFieldProps;
};

export default function InputField({
  inputProps,
  ...props
}: Props): ReactElement {
  const [field, { error }] = useField(props);
  const { name } = field;

  return (
    <Box my={2}>
      <FormControl fullWidth>
        <TextField
          name={name}
          id={name}
          type={name === "password" ? name : "text"}
          label={name}
          {...inputProps}
          {...field}
          error={!!error}
          helperText={!!error && error}
          fullWidth
          autoComplete="off"
        />
      </FormControl>
    </Box>
  );
}

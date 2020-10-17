import { Typography } from "@material-ui/core";
import { useMeQuery } from "../src/generated/graphql";

export default function Me() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <pre>error: {error && JSON.stringify(error, null, 4)}</pre>;

  return (
    <div>
      <h1>Me</h1>
      <pre>data: {data && JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

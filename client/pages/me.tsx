import { useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import me from "../qraphql/queries/me";

export default function Me() {
  const { data, loading, error } = useQuery(me);

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <pre>error: {error && JSON.stringify(error, null, 4)}</pre>;

  return (
    <div>
      <h1>Me</h1>
      <pre>data: {data && JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

import { useQuery } from "@apollo/client";
import { Container, Typography } from "@material-ui/core";
import apolloPrefetch from "../lib/apolloPrefetch";
import users from "../qraphql/queries/users";

export default function Index() {
  const { data, loading, error } = useQuery(users);

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <pre>error: {error && JSON.stringify(error, null, 4)}</pre>;

  return (
    <>
      <Typography variant="h3" color="secondary">
        Index
      </Typography>
      <pre>data: {data && JSON.stringify(data, null, 4)}</pre>
    </>
  );
}
export const getStaticProps = async () => apolloPrefetch([users]);

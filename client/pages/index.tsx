import { useQuery } from "@apollo/client";
import apolloPrefetch from "../lib/apolloPrefetch";
import users from "../qraphql/queries/users";

export default function Index() {
  const { data, loading, error } = useQuery(users);

  return (
    <div>
      <h3>Index</h3>
      <h1 style={{ color: "red" }}>{loading && "loading..."}</h1>
      <pre>error: {error && JSON.stringify(error, null, 4)}</pre>
      <pre>data: {data && JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
export const getStaticProps = async () => apolloPrefetch([users]);

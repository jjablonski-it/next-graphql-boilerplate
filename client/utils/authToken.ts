let authToken: string;

export const getToken = () => authToken;

export const setToken = (token: string) => {
  console.log("new auth token", token);

  authToken = token;
  return true;
};

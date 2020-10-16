let authToken: string;

export const getToken = () => authToken;

export const setToken = (token: string) => {
  authToken = token;
  return true;
};

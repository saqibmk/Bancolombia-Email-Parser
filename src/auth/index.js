import { getAuthURL, getAuthObject } from './helpers';

export const getURL = async () => {
  try {
    const authObj = await getAuthObject();
    return await getAuthURL(authObj);
  } catch (error) {
    return new Error(error);
  }
};

export const getAuthTokenWithCode = async (token) => {
  const authObj = await getAuthObject();
  const tokenObj = await authObj.getToken(token);
  return tokenObj.tokens;
};

import { authKey } from "@/constants/authToken";
import { decodeToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodeToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isUserLoggedIn = (key: string): boolean => {
  const authToken = getFromLocalStorage(key);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  removeFromLocalStorage(key);
};

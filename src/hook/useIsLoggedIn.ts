import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useIsLoggedIn = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  if (accessToken.length > 0) {
    return true;
  }

  return false;
};

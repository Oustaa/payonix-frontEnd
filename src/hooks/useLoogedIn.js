import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../features/auth-slice";

const useIsloggedIn = () => {
  const dispatch = useDispatch();
  const { status, value, username } = useSelector((state) => state.auth);
  const [cookies, setCookies] = useCookies();
};

export default useIsloggedIn;

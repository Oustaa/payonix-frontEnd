import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { logIn as login } from "../features/auth-slice";
import { resetArtisans } from "../features/artisan-slice";
import { resetProducts } from "../features/products-slice";
import { resetMaterials } from "../features/rawMaterial-slice";
import { resetSuppliers } from "../features/supplier-slice";
import { InputGroup, Button } from "../styles";
import {
  StyledLogInContainer,
  StyledLogIn,
  StyledLogInHeader,
  StyledLogInForm,
} from "../styles/styled-login";
import Loading from "../components/Loading";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();

  const { status, value } = useSelector((state) => state.auth);

  const [email, setEmail] = useState({ value: "", valid: true });
  const [password, setPassword] = useState({ value: "", valid: true });

  const emailChangeHndler = (e) => {
    setEmail((prev) => {
      return { ...prev, value: e.target.value };
    });
  };
  const passwordChangeHndler = (e) => {
    setPassword((prev) => {
      return { ...prev, value: e.target.value };
    });
  };

  useEffect(() => {
    if (status === "idle") return navigate("/");
  }, [navigate, status, value]);

  const submitHundler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          u_email: email.value,
          u_password: password.value,
        }
      );

      const { accessToken, username } = response.data;

      if (accessToken) {
        dispatch(login({ accessToken, username }));

        let expires = new Date();
        expires.setTime(expires.getTime() + 43200 * 1000);
        setCookie("access_token", accessToken, {
          path: "/",
          expires,
        });
        setCookie("user_name", username, {
          path: "/",
          expires,
        });

        // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})

        dispatch(resetArtisans());
        dispatch(resetSuppliers());
        dispatch(resetProducts());
        dispatch(resetMaterials());

        navigate("/dashboard");
      }
    } catch (error) {
      const responseData = error?.response?.data;
      if (!responseData.email)
        setEmail((prev) => {
          return { ...prev, valid: false };
        });
      else {
        setEmail((prev) => {
          return { ...prev, valid: true };
        });
      }
      if (!responseData.password)
        setPassword((prev) => {
          return { ...prev, valid: false };
        });
      else {
        setPassword((prev) => {
          return { ...prev, valid: true };
        });
      }
    }
  };

  if (status === "loading") return <Loading />;

  return (
    <StyledLogInContainer>
      <StyledLogIn>
        <StyledLogInHeader>
          <h1>Logo</h1>
          <h2>Log in</h2>
        </StyledLogInHeader>
        <StyledLogInForm onSubmit={submitHundler}>
          <InputGroup className={!email.valid ? "invalid" : ""} inline={false}>
            <label htmlFor="">Username or Email:</label>
            <input
              type="text"
              placeholder="enter your username or your email"
              value={email.value}
              onChange={emailChangeHndler}
            />
            {/* {!email.valid ? <p>email is invalid</p> : null} */}
          </InputGroup>
          <InputGroup
            className={!password.valid ? "invalid" : ""}
            inline={false}
          >
            <label htmlFor="">Password:</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password.value}
              onChange={passwordChangeHndler}
            />
            {/* {!password.valid ? <p>password is invalid</p> : null} */}
          </InputGroup>
          <Button bgColor={"var(--primary-cyan-800)"} color={"var(--white)"}>
            Log in
          </Button>
        </StyledLogInForm>
      </StyledLogIn>
    </StyledLogInContainer>
  );
};

export default LogIn;

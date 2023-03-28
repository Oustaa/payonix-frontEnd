import axios from "axios";

export async function isLoggedIn(token) {
  const response = await axios.post(
    "http://localhost:8000/auth/isLoggedIn",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = response.data;
  return data;
}

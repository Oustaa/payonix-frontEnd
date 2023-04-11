import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASE_URL}/users`;

async function getUsers(handlers, token) {
  handlers.loading(true);
  try {
    const response = await axios.get(URL, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token,
      },
    });
    const users = await response.data;
    console.log(users);
    handlers.success(users);
  } catch (error) {
    handlers.error(error);
  } finally {
    handlers.loading(false);
  }
}

const usersHeaders = {
  Name: { value: "u_name" },
  "Phone Number": { value: "u_phone" },
  Email: { value: "u_email" },
  Role: { value: "u_role" },
  "Created At": { value: "createdAt", type: "date" },
};
const Users = () => {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(
      { success: setUsers, error: setError, loading: setLoading },
      token
    );
  }, []);

  return (
    <Table
      headers={usersHeaders}
      data={users}
      loading={loading}
      error={error}
      tableTitle="Users:"
      componentName="users"
      alertTitle="Create User"
    />
  );
};

export default Users;

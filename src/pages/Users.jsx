import React, { useEffect } from "react";
import Table from "../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/user-slice";

const usersHeaders = {
  Name: { value: "u_name" },
  "Phone Number": { value: "u_phone" },
  Email: { value: "u_email" },
  Role: { value: "u_role" },
  "Created At": { value: "createdAt", type: "date" },
};
const Users = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { data, error, loading } = useSelector((state) => state.users.users);

  useEffect(() => {
    if (data.length === 0) dispatch(getUsers({ token }));
  }, []);

  return (
    <Table
      headers={usersHeaders}
      data={data}
      loading={loading}
      error={error}
      tableTitle="Users:"
      componentName="user"
      alertTitle="Create User"
      id_name="u_id"
      endPoint="/users"
      deletable={true}
    />
  );
};

export default Users;

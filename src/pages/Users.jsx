import React, { useEffect } from "react";
import Table from "../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/user-slice";
import Loading from "../components/Loading";
import Error from "../components/Error";

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

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Table
      headers={usersHeaders}
      data={data}
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

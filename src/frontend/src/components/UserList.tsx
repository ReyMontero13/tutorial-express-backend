import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/api";

interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  console.log(users);
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};
export default UserList;

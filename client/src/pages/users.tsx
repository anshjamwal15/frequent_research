import React, { useEffect, useState } from 'react';
import UserTable from './usertable';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  gender: string;
  dateOfBirth: string;
  age: number;
}

const Users: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/users")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div style={containerStyle}>
      <h1>Registered Users</h1>
      <UserTable users={user} />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

export default Users;

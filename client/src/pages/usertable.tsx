import React from 'react';
import { User } from './users';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>First Name</th>
          <th style={cellStyle}>Last Name</th>
          <th style={cellStyle}>Email</th>
          <th style={cellStyle}>Country</th>
          <th style={cellStyle}>State</th>
          <th style={cellStyle}>City</th>
          <th style={cellStyle}>Gender</th>
          <th style={cellStyle}>Date of Birth</th>
          <th style={cellStyle}>Age</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td style={cellStyle}>{user.firstName}</td>
            <td style={cellStyle}>{user.lastName}</td>
            <td style={cellStyle}>{user.email}</td>
            <td style={cellStyle}>{user.country}</td>
            <td style={cellStyle}>{user.state}</td>
            <td style={cellStyle}>{user.city}</td>
            <td style={cellStyle}>{user.gender}</td>
            <td style={cellStyle}>{user.dateOfBirth}</td>
            <td style={cellStyle}>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  fontSize: '16px',
  border: '1px solid #ddd',
};


const cellStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default UserTable;

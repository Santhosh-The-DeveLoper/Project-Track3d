import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './FetchUsers.css';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("https://material-recommendation-backend.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`https://material-recommendation-backend.vercel.app/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setUsers(users.filter((user) => user.id !== id));
          } else {
            alert("Failed to delete user.");
          }
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="Whited" style={{ padding: "20px" }}>
      <div className="navx">
        <div className="right">
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/fetchusers">Manage Users</Link></li>
            <li><Link to="/fetchmaterials">Manage Materials</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </div>
      <h2 className="fetchinglist">Users List</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>S.no</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>User</td>
                <td style={tdStyle}>
                  <button onClick={() => handleDelete(user.id)} style={deleteBtnStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={tdStyle}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid black",
  padding: "10px",
  backgroundColor: "#eee",
  color: "#000",
};

const tdStyle = {
  border: "1px solid black",
  padding: "10px",
  textAlign: "center",
  color: "#000",
  fontSize: "18px",
};

const deleteBtnStyle = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};
export default UserList;

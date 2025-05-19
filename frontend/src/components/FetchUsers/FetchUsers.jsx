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
    <div className="Whited">
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

      <table className="table-users">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>User</td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

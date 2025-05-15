import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialForm from '../FetchMaterialForm/FetchMaterialForm';
import { Link } from "react-router-dom";
import './FetchMaterials.css';

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [editMaterial, setEditMaterial] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const res = await axios.get("https://material-recommendation-backend.vercel.app/materials");
    setMaterials(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      await axios.delete(`https://material-recommendation-backend.vercel.app/materials/${id}`);
      fetchMaterials();
    }
  };

  const handleEdit = (material) => {
    setEditMaterial(material);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditMaterial(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    fetchMaterials();
    setShowForm(false);
    setEditMaterial(null);
  };

  return (
    <div className="materails">
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
      <div>
        <h1 className="list">Materials List</h1>
        <table className="material-table">
          <thead>
            <tr>
              <th className="bold">S.no</th>
              <th className="bold">Material</th>
              <th className="bold">Durability</th>
              <th className="bold">Cost_Per_Unit</th>
              <th className="bold">Environmental_Suitability</th>
              <th className="bold">Thermal_Insulation</th>
              <th className="bold">Availability</th>
              <th className="bold">Fire_Resistance</th>
              <th className="bold">Water_Resistance</th>
              <th className="bold">Weight_Per_Unit (kg)</th>
              <th className="bold" colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat, index) => (
              <tr key={mat._id}>
                <td>{index + 1}</td>
                <td>{mat.Material}</td>
                <td>{mat.Durability}</td>
                <td>{mat.Cost_Per_Unit}</td>
                <td>{mat.Environmental_Suitability}</td>
                <td>{mat.Thermal_Insulation}</td>
                <td>{mat.Availability}</td>
                <td>{mat.Fire_Resistance}</td>
                <td>{mat.Water_Resistance}</td>
                <td>{mat["Weight_Per_Unit (kg)"]}</td>
                <td>
                  <button className="update-button" onClick={() => handleEdit(mat)}>Update</button>

                </td>
                <td><button className="delete-button" onClick={() => handleDelete(mat._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-button" onClick={handleAdd}>Add</button>
      </div>

        {showForm && (
          <div className="overlay">
            <div className="overlay-content">
              <MaterialForm
                onSubmit={handleFormSubmit}
                material={editMaterial}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default MaterialList;


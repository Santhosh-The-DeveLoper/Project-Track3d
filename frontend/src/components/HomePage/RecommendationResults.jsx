import React from "react";

const RecommendationResults = ({ recommendations }) => {
  return (
    <div>
      <h3>Recommended Materials</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Material</th>
            <th>Durability</th>
            <th>Cost Per Unit</th>
            <th>Environmental Suitability</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((material, index) => (
            <tr key={index}>
              <td>{material.Material}</td>
              <td>{material.Durability}</td>
              <td>{material.Cost_Per_Unit}</td>
              <td>{material.Environmental_Suitability}</td>
              <td>{material.Availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendationResults;

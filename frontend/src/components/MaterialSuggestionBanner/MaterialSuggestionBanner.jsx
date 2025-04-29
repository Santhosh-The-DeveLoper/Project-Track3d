import React from 'react';
import './MaterialSuggestionBanner.css';

const MaterialSuggestionBanner = ({ recommendedMaterials }) => {
  if (!recommendedMaterials || recommendedMaterials.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * recommendedMaterials.length);
  const selectedMaterial = recommendedMaterials[randomIndex];

  return (
    <div className="material-banner">
      <h2>🏗️ Suggested for You: {selectedMaterial.Material}</h2>
      <p><strong>Durability:</strong> {selectedMaterial.Durability}</p>
      <p><strong>Cost/Unit:</strong> ₹{selectedMaterial.Cost_Per_Unit}</p>
      <p><strong>Eco-Friendly:</strong> {selectedMaterial.Environmental_Suitability}</p>
      <p><strong>Fire Resistance:</strong> {selectedMaterial.Fire_Resistance}</p>
    </div>
  );
};

export default MaterialSuggestionBanner;

import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import MaterialSuggestionBanner from '../MaterialSuggestionBanner/MaterialSuggestionBanner';
import SlidingImageCarousel from '../SlidingImageCarousel/SlidingImageCarousel';
import constructionImg1 from "../Assets/img.png"; 
import constructionImg2 from "../Assets/img3.jpg"; 

const MaterialRecommendation = () => {
  const [budget, setBudget] = useState("");
  const [minDurability, setMinDurability] = useState("");
  const [environmentalSuitability, setEnvironmentalSuitability] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://material-recommendation-backend.vercel.app/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: Number(budget),
          min_durability: Number(minDurability),
          environmental_suitability: environmentalSuitability,
        }),
      });

      const data = await response.json();

      if (data.length > 0) {
        setRecommendations(data);
        setShowResults(true);
      } else {
        setRecommendations([]);
        setShowResults(false);
        alert("No materials matched your criteria.");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations.");
    }
  };

  useEffect(() => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.remove('show'); 
          void el.offsetWidth;

          el.classList.add('show');
        }
      });
    },
    { threshold: 0.3 }
  );

  animatedElements.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="home-page-body">
      <div className="wrapper1 animate-on-scroll">
        <div className="upper">
          <h1>Construction material recommendation system</h1>
          <div className="links">
            <ul><li><Link to="/home">Home</Link></li></ul>
            <ul><li><Link to="/">Logout</Link></li></ul>
          </div>
        </div>
        <div className="lower">
          <h2>Welcome to the Material Recommendation System</h2>
          <p>Find the best materials for your construction needs.</p>
          <p>Use the form below to get personalized recommendations based on your budget and requirements.</p>
        </div>
      </div>

      <div className="wrapper2 animate-on-scroll">
        <h2 className="wrapper2h2">Material Recommendation</h2>
        <form onSubmit={handleSubmit}>
          <label className="inputfeild">
            Budget:
            <input
              className="material-input"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </label>
          <label className="inputfeild">
            Min Durability:
            <input
              className="material-input"
              type="number"
              value={minDurability}
              onChange={(e) => setMinDurability(e.target.value)}
              required
            />
          </label>
          <label className="inputfeild">
            Environmental Suitability:
            <select
              value={environmentalSuitability}
              onChange={(e) => setEnvironmentalSuitability(e.target.value)}
            >
              <option value="">Any</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <button className="btn-get" type="submit">Get Recommendations</button>
        </form>
      </div>

      {showResults && (
        <div className="wrapper3 animate-on-scroll">
          <h3>Recommended Materials</h3>

          <MaterialSuggestionBanner recommendedMaterials={recommendations} />

          <table className="recommendation-table">
            <thead>
              <tr>
                <th className="recommendation-th">Material</th>
                <th className="recommendation-th">Durability</th>
                <th className="recommendation-th">Cost Per Unit</th>
                <th className="recommendation-th">Environmental Suitability</th>
                <th className="recommendation-th">Availability</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((material, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="recommendation-td">{material.Material}</td>
                    <td className="recommendation-td">{material.Durability}</td>
                    <td className="recommendation-td">{material.Cost_Per_Unit}</td>
                    <td className="recommendation-td">{material.Environmental_Suitability}</td>
                    <td className="recommendation-td">{material.Availability}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <SlidingImageCarousel materialName={material.Material} />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="information animate-on-scroll animate-left">
        <div className="information-matter">
          <p>Selecting the right construction materials is critical to the success of any project. <br />
            From durability and cost to environmental suitability, material choices directly affect a building's strength, sustainability,and lifespan. <br />
            Our Construction Material Recommendation System leverages artificial intelligence to analyze project-specific parameters <br />
            and deliver precise, data-driven recommendations that simplify this complex decision-making process.</p>
        </div>
        <div className="information-img">
          <img src={constructionImg1} alt="Construction AI" />
        </div>
      </div>
      <div className="information info animate-on-scroll animate-right">
        <div className="information-img">
          <img src={constructionImg2} alt="Construction AI" />
        </div>
        <div className="information-matter">
          <p>Whether you're constructing in extreme climates, limited by budget, or aiming for eco-friendly solutions, the system intelligently suggests materials that align with your project’s performance and sustainability goals. By analyzing structural needs, environmental conditions, and material properties, it empowers engineers, architects, and builders to make smarter, greener, and more cost-efficient decisions without compromising quality.</p>
        </div>
      </div>
      <div className="marker animate-on-scroll">
        <h1>Construction Material Recommendation System</h1><br/>
        <p>
          🏗️Helps users find the most suitable building materials based on their budget, durability needs, and environmental preferences. Powered by intelligent data-driven recommendations and real-time visuals, this platform ensures smarter, safer, and more sustainable construction decisions.
        </p><br/>
        <p>
          © {new Date().getFullYear()} | Developed with ❤️ by Santhosh Kumar 
        </p>
      </div>
    </div>
  );
};

export default MaterialRecommendation;

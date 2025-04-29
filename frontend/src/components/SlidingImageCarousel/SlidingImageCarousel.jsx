import React, { useEffect, useState } from "react";
import "./SlidingImageCarousel.css";

const ACCESS_KEY = "809yueGOS6YbcK5QgtvYSfBE6Ho6xq0131Ew-7n_xmU"; 

const SlidingImageCarousel = ({ materialName }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${materialName}&per_page=5&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data.results || []);
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
      }
    };

    fetchImages();
  }, [materialName]);

  if (!images.length) return <p>Loading images...</p>;

  return (
    <div className="unsplash-carousel">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.urls.regular}
          alt={materialName}
          className="carousel-image"
        />
      ))}
    </div>
  );
};

export default SlidingImageCarousel;

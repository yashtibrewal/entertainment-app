import React, { useState, useEffect, useRef } from "react";
import TrendingCart from "./TrendingCart";

const Trending = ({ trendingMovies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDistance, setDragDistance] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const cardWidth = 350; // Width of a single card (w-96 in Tailwind)
  const carouselRef = useRef(null);

  // Check if the cards overflow the container
  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const contentWidth = trendingMovies.length * cardWidth;
      setIsOverflowing(contentWidth > containerWidth);
    }
  }, [trendingMovies]);

  const handleMouseDown = (e) => {
    if (!isOverflowing) return;
    setDragStartX(e.clientX || e.touches?.[0]?.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isOverflowing || dragStartX === null) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    setDragDistance(dragStartX - currentX);
  };

  const handleMouseUp = () => {
    if (!isOverflowing || dragStartX === null) return;

    const dragThreshold = cardWidth / 2; // Minimum drag to trigger movement
    const cardsToScroll = Math.round(dragDistance / dragThreshold);

    // Calculate new index based on drag
    let newIndex = currentIndex + cardsToScroll;

    // Clamp the index to ensure it's within bounds
    if (newIndex < 0) newIndex = 0;
    if (newIndex > trendingMovies.length - 1) newIndex = trendingMovies.length - 1;

    setCurrentIndex(newIndex);
    setDragStartX(null);
    setDragDistance(0);
  };

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden relative w-screen h-64 gap-2 " // Full device width
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
    <h1 className="text-white  text-2xl font-semibold mb-3">Trending</h1>
      <div
        className={`flex gap-3 transition-transform duration-300 ease-out ${
          isOverflowing ? "" : "justify-center"
        }`}
        style={{
          transform: `translateX(-${currentIndex * cardWidth}px)`,
          width: `${trendingMovies.length * cardWidth}px`,
        }}
      >
      
        {trendingMovies.map((card, index) => (
          <div key={index} className="flex-shrink-0">
            <TrendingCart {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;

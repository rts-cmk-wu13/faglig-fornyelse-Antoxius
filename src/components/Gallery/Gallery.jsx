import { useState, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './Gallery.css';

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Sample images - replace with your actual images
  const images = [
    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200', alt: 'Product 1' },
    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200', alt: 'Product 2' },
    { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200', alt: 'Product 3' },
    { url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200', alt: 'Product 4' },
    { url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200', alt: 'Product 5' },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gallery-container">
      <div className="carousel">
        {/* Previous Button */}
        <button 
          className="carousel-button prev" 
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <IoChevronBack />
        </button>

        {/* Image Display */}
        <div className="carousel-image-container">
          <img 
            src={images[currentIndex].url} 
            alt={images[currentIndex].alt}
            className="carousel-image"
          />
        </div>

        {/* Next Button */}
        <button 
          className="carousel-button next" 
          onClick={goToNext}
          aria-label="Next slide"
        >
          <IoChevronForward />
        </button>

        {/* Indicators/Dots */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <button 
          className="autoplay-toggle"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          aria-label={isAutoPlay ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlay ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
}

export default Gallery;

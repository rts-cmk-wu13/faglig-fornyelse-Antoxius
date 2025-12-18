import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Gallery from './Gallery.jsx';

describe('Gallery Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Component Structure', () => {
    it('should render the gallery container', () => {
      render(<Gallery />);
      const container = document.querySelector('.gallery-container');
      expect(container).toBeInTheDocument();
    });

    it('should render the carousel', () => {
      render(<Gallery />);
      const carousel = document.querySelector('.carousel');
      expect(carousel).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      const nextButton = screen.getByLabelText('Next slide');
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should render auto-play toggle button', () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Image Display', () => {
    it('should display the first image by default', () => {
      render(<Gallery />);
      const image = screen.getByAltText('Product 1');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200');
    });

    it('should have correct image class', () => {
      render(<Gallery />);
      const image = screen.getByAltText('Product 1');
      expect(image).toHaveClass('carousel-image');
    });

    it('should display image in container', () => {
      render(<Gallery />);
      const container = document.querySelector('.carousel-image-container');
      expect(container).toBeInTheDocument();
      expect(container).toContainElement(screen.getByAltText('Product 1'));
    });
  });

  describe('Navigation - Next Button', () => {
    it('should move to next image when next button is clicked', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      fireEvent.click(nextButton);
      
      const image = screen.getByAltText('Product 2');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200');
    });

    it('should wrap to first image when next is clicked on last image', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      // Click next 5 times to reach the last image and wrap around
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      
      const image = screen.getByAltText('Product 1');
      expect(image).toBeInTheDocument();
    });

    it('should have correct button class for next button', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      expect(nextButton).toHaveClass('carousel-button', 'next');
    });
  });

  describe('Navigation - Previous Button', () => {
    it('should move to previous image when previous button is clicked', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      const prevButton = screen.getByLabelText('Previous slide');
      
      // Go to second image first
      fireEvent.click(nextButton);
      // Then go back
      fireEvent.click(prevButton);
      
      const image = screen.getByAltText('Product 1');
      expect(image).toBeInTheDocument();
    });

    it('should wrap to last image when previous is clicked on first image', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      
      fireEvent.click(prevButton);
      
      const image = screen.getByAltText('Product 5');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200');
    });

    it('should have correct button class for previous button', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      expect(prevButton).toHaveClass('carousel-button', 'prev');
    });
  });

  describe('Indicator Dots', () => {
    it('should render 5 indicator dots', () => {
      render(<Gallery />);
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators).toHaveLength(5);
    });

    it('should have first indicator active by default', () => {
      render(<Gallery />);
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators[0]).toHaveClass('active');
    });

    it('should navigate to specific image when indicator is clicked', () => {
      render(<Gallery />);
      const indicators = document.querySelectorAll('.indicator');
      
      fireEvent.click(indicators[2]);
      
      const image = screen.getByAltText('Product 3');
      expect(image).toBeInTheDocument();
      expect(indicators[2]).toHaveClass('active');
    });

    it('should update active indicator when navigating with next button', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      fireEvent.click(nextButton);
      
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators[1]).toHaveClass('active');
      expect(indicators[0]).not.toHaveClass('active');
    });

    it('should update active indicator when navigating with previous button', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      
      fireEvent.click(prevButton);
      
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators[4]).toHaveClass('active');
    });

    it('should have correct aria-label for each indicator', () => {
      render(<Gallery />);
      const indicator1 = screen.getByLabelText('Go to slide 1');
      const indicator3 = screen.getByLabelText('Go to slide 3');
      const indicator5 = screen.getByLabelText('Go to slide 5');
      
      expect(indicator1).toBeInTheDocument();
      expect(indicator3).toBeInTheDocument();
      expect(indicator5).toBeInTheDocument();
    });

    it('should render indicators container', () => {
      render(<Gallery />);
      const container = document.querySelector('.carousel-indicators');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Auto-play Functionality', () => {
    it('should auto-advance to next image after 4 seconds', async () => {
      render(<Gallery />);
      
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });

    it('should continuously auto-advance through all images', async () => {
      render(<Gallery />);
      
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 3')).toBeInTheDocument();
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 4')).toBeInTheDocument();
    });

    it('should wrap to first image after last image in auto-play', () => {
      render(<Gallery />);
      
      // Advance through all 5 images
      vi.advanceTimersByTime(4000 * 5);
      
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    });

    it('should stop auto-play when toggle is clicked', () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      fireEvent.click(toggleButton);
      
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      vi.advanceTimersByTime(4000);
      
      // Should still be on first image
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    });

    it('should resume auto-play when toggle is clicked again', async () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      // Pause
      fireEvent.click(toggleButton);
      vi.advanceTimersByTime(4000);
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      // Resume
      const playButton = screen.getByLabelText('Start autoplay');
      fireEvent.click(playButton);
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });
  });

  describe('Auto-play Toggle Button', () => {
    it('should show pause symbol when auto-play is active', () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      expect(toggleButton).toHaveTextContent('❚❚');
    });

    it('should show play symbol when auto-play is paused', () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      fireEvent.click(toggleButton);
      
      const playButton = screen.getByLabelText('Start autoplay');
      expect(playButton).toHaveTextContent('▶');
    });

    it('should have correct class', () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      expect(toggleButton).toHaveClass('autoplay-toggle');
    });

    it('should toggle aria-label correctly', () => {
      render(<Gallery />);
      
      let toggleButton = screen.getByLabelText('Pause autoplay');
      expect(toggleButton).toBeInTheDocument();
      
      fireEvent.click(toggleButton);
      
      toggleButton = screen.getByLabelText('Start autoplay');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for previous button', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      expect(prevButton).toHaveAttribute('aria-label', 'Previous slide');
    });

    it('should have aria-label for next button', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      expect(nextButton).toHaveAttribute('aria-label', 'Next slide');
    });

    it('should have aria-labels for all indicator buttons', () => {
      render(<Gallery />);
      for (let i = 1; i <= 5; i++) {
        const indicator = screen.getByLabelText(`Go to slide ${i}`);
        expect(indicator).toBeInTheDocument();
      }
    });

    it('should have alt text for all images', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      // Check first image
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      // Check other images by navigating
      for (let i = 2; i <= 5; i++) {
        fireEvent.click(nextButton);
        expect(screen.getByAltText(`Product ${i}`)).toBeInTheDocument();
      }
    });

    it('should have proper button types', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      const nextButton = screen.getByLabelText('Next slide');
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      expect(prevButton.tagName).toBe('BUTTON');
      expect(nextButton.tagName).toBe('BUTTON');
      expect(toggleButton.tagName).toBe('BUTTON');
    });
  });

  describe('CSS Classes', () => {
    it('should apply gallery-container class', () => {
      render(<Gallery />);
      const container = document.querySelector('.gallery-container');
      expect(container).toBeInTheDocument();
    });

    it('should apply carousel class', () => {
      render(<Gallery />);
      const carousel = document.querySelector('.carousel');
      expect(carousel).toBeInTheDocument();
    });

    it('should apply carousel-image-container class', () => {
      render(<Gallery />);
      const imageContainer = document.querySelector('.carousel-image-container');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should apply carousel-image class to image', () => {
      render(<Gallery />);
      const image = screen.getByAltText('Product 1');
      expect(image).toHaveClass('carousel-image');
    });

    it('should apply carousel-indicators class', () => {
      render(<Gallery />);
      const indicators = document.querySelector('.carousel-indicators');
      expect(indicators).toBeInTheDocument();
    });

    it('should apply active class to current indicator', () => {
      render(<Gallery />);
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators[0]).toHaveClass('active');
    });
  });

  describe('Icon Rendering', () => {
    it('should render previous icon', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      expect(prevButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should render next icon', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      expect(nextButton.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicking of next button', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      
      const image = screen.getByAltText('Product 4');
      expect(image).toBeInTheDocument();
    });

    it('should handle rapid clicking of previous button', () => {
      render(<Gallery />);
      const prevButton = screen.getByLabelText('Previous slide');
      
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);
      
      const image = screen.getByAltText('Product 3');
      expect(image).toBeInTheDocument();
    });

    it('should handle clicking indicators while auto-play is active', async () => {
      render(<Gallery />);
      const indicators = document.querySelectorAll('.indicator');
      
      fireEvent.click(indicators[3]);
      
      expect(screen.getByAltText('Product 4')).toBeInTheDocument();
      
      // Auto-play should continue from this position
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 5')).toBeInTheDocument();
    });

    it('should handle navigation buttons while auto-play is active', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      vi.advanceTimersByTime(2000); // Advance halfway through auto-play
      fireEvent.click(nextButton);
      
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });

    it('should handle toggling auto-play multiple times', () => {
      render(<Gallery />);
      let toggleButton = screen.getByLabelText('Pause autoplay');
      
      fireEvent.click(toggleButton);
      toggleButton = screen.getByLabelText('Start autoplay');
      
      fireEvent.click(toggleButton);
      toggleButton = screen.getByLabelText('Pause autoplay');
      
      fireEvent.click(toggleButton);
      toggleButton = screen.getByLabelText('Start autoplay');
      
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should maintain current index when auto-play is toggled', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      
      expect(screen.getByAltText('Product 3')).toBeInTheDocument();
      
      fireEvent.click(toggleButton);
      
      expect(screen.getByAltText('Product 3')).toBeInTheDocument();
    });

    it('should update indicator state with image changes', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      fireEvent.click(nextButton);
      
      const indicators = document.querySelectorAll('.indicator');
      expect(indicators[1]).toHaveClass('active');
      expect(indicators[0]).not.toHaveClass('active');
    });
  });

  describe('useEffect Cleanup', () => {
    it('should cleanup interval on unmount', async () => {
      const { unmount } = render(<Gallery />);
      
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
      
      unmount();
      
      // Should not throw errors
      vi.advanceTimersByTime(4000);
    });

    it('should cleanup and restart interval when auto-play is toggled', async () => {
      render(<Gallery />);
      const toggleButton = screen.getByLabelText('Pause autoplay');
      
      // Initial state
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      // Pause
      fireEvent.click(toggleButton);
      vi.advanceTimersByTime(4000);
      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      
      // Resume
      const playButton = screen.getByLabelText('Start autoplay');
      fireEvent.click(playButton);
      await act(async () => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });
  });

  describe('Image Properties', () => {
    it('should have correct image URLs', () => {
      render(<Gallery />);
      const nextButton = screen.getByLabelText('Next slide');
      
      const expectedUrls = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200',
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200',
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200'
      ];
      
      expectedUrls.forEach((url, index) => {
        const image = screen.getByAltText(`Product ${index + 1}`);
        expect(image).toHaveAttribute('src', url);
        if (index < expectedUrls.length - 1) {
          fireEvent.click(nextButton);
        }
      });
    });
  });
});

// testimonials.js
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const container = document.querySelector('.testimonials-container');
    
    let currentIndex = 0;
    let isAnimating = false;
  
    initSlider();
  
    function initSlider() {
      updateDimensions();
      updateTrackPosition();
      updateDots();
    }
  
    function getTestimonialWidth() {
      const containerWidth = container.offsetWidth;
      const testimonial = testimonials[0];
      const style = getComputedStyle(testimonial);
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      return containerWidth - margin;
    }
  
    function updateTrackPosition() {
      const width = getTestimonialWidth();
      const offset = -currentIndex * width;
      track.style.transform = `translateX(${offset}px)`;
    }
  
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    nextBtn.addEventListener('click', () => {
      if (!isAnimating && currentIndex < testimonials.length - 1) {
        isAnimating = true;
        currentIndex++;
        updateTrackPosition();
        updateDots();
        setTimeout(() => isAnimating = false, 600);
      }
    });
  
    prevBtn.addEventListener('click', () => {
      if (!isAnimating && currentIndex > 0) {
        isAnimating = true;
        currentIndex--;
        updateTrackPosition();
        updateDots();
        setTimeout(() => isAnimating = false, 600);
      }
    });
  
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (!isAnimating && index !== currentIndex) {
          isAnimating = true;
          currentIndex = index;
          updateTrackPosition();
          updateDots();
          setTimeout(() => isAnimating = false, 600);
        }
      });
    });
  
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        updateTrackPosition();
      }, 100);
    });
  
    function updateDimensions() {
      const width = getTestimonialWidth();
      track.style.width = `${testimonials.length * width}px`;
      testimonials.forEach(testimonial => {
        const margin = parseFloat(getComputedStyle(testimonial).marginLeft) + parseFloat(getComputedStyle(testimonial).marginRight);
        testimonial.style.minWidth = `${width}px`;
        testimonial.style.width = `${width}px`;
      });
    }
  
    let touchStartX = 0;
    let touchEndX = 0;
  
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
  
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  
    function handleSwipe() {
      if (isAnimating) return;
      const threshold = 50;
      const difference = touchStartX - touchEndX;
      
      if (difference > threshold && currentIndex < testimonials.length - 1) {
        isAnimating = true;
        currentIndex++;
        updateTrackPosition();
        updateDots();
        setTimeout(() => isAnimating = false, 600);
      } else if (difference < -threshold && currentIndex > 0) {
        isAnimating = true;
        currentIndex--;
        updateTrackPosition();
        updateDots();
        setTimeout(() => isAnimating = false, 600);
      }
    }
  });
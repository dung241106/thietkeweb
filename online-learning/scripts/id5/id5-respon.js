document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.testimonials-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const container = document.querySelector('.testimonials-container');
  
  let currentIndex = 0;
  let isAnimating = false;

  // Khởi tạo slider
  initSlider();

  function initSlider() {
    updateDimensions();
    updateTrackPosition();
    updateDots();
  }

  // Tính chiều rộng thực tế của testimonial dựa trên container
  function getTestimonialWidth() {
    const containerWidth = container.offsetWidth;
    const testimonial = testimonials[0];
    const style = getComputedStyle(testimonial);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return containerWidth - margin; // Chiều rộng khớp với container, trừ margin
  }

  // Cập nhật vị trí track
  function updateTrackPosition() {
    const width = getTestimonialWidth();
    const offset = -currentIndex * width;
    track.style.transform = `translateX(${offset}px)`;
  }

  // Cập nhật dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Sự kiện nhấn nút Next
  nextBtn.addEventListener('click', () => {
    if (!isAnimating && currentIndex < testimonials.length - 1) {
      isAnimating = true;
      currentIndex++;
      updateTrackPosition();
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 600); // Match CSS transition duration
    }
  });

  // Sự kiện nhấn nút Prev
  prevBtn.addEventListener('click', () => {
    if (!isAnimating && currentIndex > 0) {
      isAnimating = true;
      currentIndex--;
      updateTrackPosition();
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 600); // Match CSS transition duration
    }
  });

  // Sự kiện nhấn dot
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!isAnimating && index !== currentIndex) {
        isAnimating = true;
        currentIndex = index;
        updateTrackPosition();
        updateDots();
        setTimeout(() => {
          isAnimating = false;
        }, 600); // Match CSS transition duration
      }
    });
  });

  // Xử lý resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateDimensions();
      updateTrackPosition();
    }, 100); // Phản hồi nhanh trên mobile
  });

  // Cập nhật kích thước
  function updateDimensions() {
    const width = getTestimonialWidth();
    track.style.width = `${testimonials.length * width}px`; // Đảm bảo track đủ rộng
    testimonials.forEach(testimonial => {
      const margin = parseFloat(getComputedStyle(testimonial).marginLeft) + parseFloat(getComputedStyle(testimonial).marginRight);
      testimonial.style.minWidth = `${width}px`; // Đặt minWidth khớp với container
      testimonial.style.width = `${width}px`; // Đặt width cố định để tránh tràn
    });
  }

  // Xử lý touch cho điện thoại (vuốt trái/phải)
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
    
    const threshold = 50; // Ngưỡng vuốt (px)
    const difference = touchStartX - touchEndX;
    
    if (difference > threshold && currentIndex < testimonials.length - 1) {
      // Vuốt trái - sang phải (Next)
      isAnimating = true;
      currentIndex++;
      updateTrackPosition();
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 600);
    } else if (difference < -threshold && currentIndex > 0) {
      // Vuốt phải - sang trái (Prev)
      isAnimating = true;
      currentIndex--;
      updateTrackPosition();
      updateDots();
      setTimeout(() => {
        isAnimating = false;
      }, 600);
    }
  }
});
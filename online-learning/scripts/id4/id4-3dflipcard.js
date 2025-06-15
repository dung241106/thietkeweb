// flip-card.js
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });
  
      // Thêm hiệu ứng hover nhẹ với màu Ubuntu
      card.addEventListener('mouseenter', function() {
        this.style.boxShadow = `0 10px 30px rgba(233, 84, 32, 0.5)`; // --ubuntu-orange
      });
  
      card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('flipped')) {
          this.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.2)`; // --shadow
        }
      });
    });
  });
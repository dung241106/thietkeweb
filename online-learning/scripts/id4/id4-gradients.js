// gradient-section.js
document.addEventListener('DOMContentLoaded', function() {
    const gradientContent = document.querySelector('.gradient-content');
    if (gradientContent) {
      gradientContent.addEventListener('mousemove', (e) => {
        const rect = gradientContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = mouseY / 50;
        const rotateY = -mouseX / 50;
        
        gradientContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        gradientContent.style.boxShadow = `0 20px 40px rgba(233, 84, 32, 0.4)`; // --ubuntu-orange
      });
  
      gradientContent.addEventListener('mouseleave', () => {
        gradientContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        gradientContent.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.2)`; // --shadow
      });
    }
  });
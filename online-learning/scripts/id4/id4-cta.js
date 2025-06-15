// cta.js
document.addEventListener('DOMContentLoaded', function() {
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
      ctaContent.addEventListener('mousemove', (e) => {
        const rect = ctaContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = mouseY / 50;
        const rotateY = -mouseX / 50;
        
        ctaContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        ctaContent.style.boxShadow = `0 20px 40px rgba(233, 84, 32, 0.4)`; // --ubuntu-orange
      });
  
      ctaContent.addEventListener('mouseleave', () => {
        ctaContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        ctaContent.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.2)`; // --shadow
      });
    }
  });
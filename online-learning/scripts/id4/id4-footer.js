// footer.js
document.addEventListener('DOMContentLoaded', function() {
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
      footerContent.addEventListener('mousemove', (e) => {
        const rect = footerContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = mouseY / 100;
        const rotateY = -mouseX / 100;
        
        footerContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        footerContent.style.boxShadow = `0 10px 30px rgba(119, 33, 111, 0.4)`; // --ubuntu-purple
      });
  
      footerContent.addEventListener('mouseleave', () => {
        footerContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        footerContent.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.2)`; // --shadow
      });
    }
  });
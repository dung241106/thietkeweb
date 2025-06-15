// Tilt effect cho Footer Content
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
    
    footerContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  footerContent.addEventListener('mouseleave', () => {
    footerContent.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
}
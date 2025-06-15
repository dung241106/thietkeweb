// Tilt effect cho Gradient Section
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
    
    gradientContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  gradientContent.addEventListener('mouseleave', () => {
    gradientContent.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
}
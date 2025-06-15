// Tilt effect cho CTA
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
    
    ctaContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  ctaContent.addEventListener('mouseleave', () => {
    ctaContent.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
}
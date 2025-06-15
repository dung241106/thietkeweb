// Parallax Effect nâng cao
window.addEventListener('scroll', function() {
  const parallaxSection = document.querySelector('.parallax-section');
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxSection && parallaxBg) {
    const scrollPosition = window.scrollY;
    const sectionOffset = parallaxSection.offsetTop;
    const sectionHeight = parallaxSection.offsetHeight;
    
    // Chỉ áp dụng khi section trong tầm nhìn
    if (scrollPosition > sectionOffset - window.innerHeight && scrollPosition < sectionOffset + sectionHeight) {
      const parallaxValue = (scrollPosition - sectionOffset) * 0.4;
      parallaxBg.style.transform = `translateY(${parallaxValue}px) translateZ(-2px) scale(1.5)`;
    }
  }
});

// Hiệu ứng nghiêng khi di chuột (tilt effect) - Chỉ áp dụng trên desktop
if (window.innerWidth > 768) {
  const parallaxContent = document.querySelector('.parallax-content');
  if (parallaxContent) {
    parallaxContent.addEventListener('mousemove', (e) => {
      const rect = parallaxContent.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = mouseY / 50;
      const rotateY = -mouseX / 50;
      
      parallaxContent.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    parallaxContent.addEventListener('mouseleave', () => {
      parallaxContent.style.transform = `translateZ(0) rotateX(0deg) rotateY(0deg)`;
    });
  }
}
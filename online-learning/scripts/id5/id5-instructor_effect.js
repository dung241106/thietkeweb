// instructor-effects.js
document.addEventListener('DOMContentLoaded', function() {
  const instructorSection = document.querySelector('.instructor');
  if (!instructorSection) {
    console.log('Không tìm thấy .instructor');
    return;
  }
  console.log('Đã tìm thấy .instructor, khởi tạo hiệu ứng');

  // 1. Tạo hiệu ứng particles bay theo chuột
  function createParticlesEffect() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'instructor-particles';
    instructorSection.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'instructor-particle';
      particle.style.setProperty('--size', `${Math.random() * 5 + 3}px`);
      particle.style.setProperty('--delay', `${Math.random() * 2}s`);
      particle.style.setProperty('--duration', `${Math.random() * 10 + 5}s`);
      particle.style.setProperty('--distance', `${Math.random() * 50 + 20}px`);
      particlesContainer.appendChild(particle);
    }

    let mouseX = 0, mouseY = 0;
    instructorSection.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateParticles() {
      const particles = document.querySelectorAll('.instructor-particle');
      const rect = instructorSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      particles.forEach(particle => {
        const x = (mouseX - centerX) / 20;
        const y = (mouseY - centerY) / 20;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(updateParticles);
    }
    updateParticles();
  }

  // 2. Hiệu ứng gradient morphing
  function createGradientMorph() {
    const gradientBg = document.createElement('div');
    gradientBg.className = 'instructor-gradient';
    instructorSection.prepend(gradientBg);

    let hue = 200;
    function animateGradient() {
      hue = (hue + 0.5) % 360;
      const color1 = `hsl(${hue}, 80%, 50%)`;
      const color2 = `hsl(${(hue + 60) % 360}, 80%, 50%)`;
      gradientBg.style.background = `radial-gradient(circle at 75% 25%, ${color1}, ${color2})`;
      gradientBg.style.opacity = '0.3';
      requestAnimationFrame(animateGradient);
    }
    animateGradient();
  }

  // 3. Hiệu ứng sóng ánh sáng
  function createLightWave() {
    const wave = document.createElement('div');
    wave.className = 'instructor-wave';
    instructorSection.appendChild(wave);

    let posY = 100;
    let direction = 1;
    function animateWave() {
      posY += 0.5 * direction;
      if (posY > 120 || posY < 80) direction *= -1;
      
      wave.style.background = `linear-gradient(0deg, 
        transparent, 
        rgba(97, 218, 251, ${0.4 + Math.sin(Date.now()/1000) * 0.2}), 
        transparent)`;
      wave.style.transform = `translateY(${posY}%) scaleY(${0.5 + Math.sin(Date.now()/800) * 0.3})`;
      requestAnimationFrame(animateWave);
    }
    animateWave();
  }

  // 4. Hiệu ứng hover 3D nâng cao
  function addAdvanced3DEffect() {
    let isHovering = false;
    let rotateX = 0, rotateY = 0;
    let targetRotateX = 0, targetRotateY = 0;

    instructorSection.addEventListener('mouseenter', () => {
      isHovering = true;
      instructorSection.style.transition = 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    });

    instructorSection.addEventListener('mouseleave', () => {
      isHovering = false;
      instructorSection.style.transition = 'transform 1s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    });

    instructorSection.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = instructorSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      rotateY = (x - centerX) / 15;
      rotateX = (centerY - y) / 15;

      const img = instructorSection.querySelector('img');
      const socialLinks = instructorSection.querySelector('.social-links');

      if (img) img.style.transform = `translate(${-rotateY * 0.5}px, ${-rotateX * 0.5}px)`;
      if (socialLinks) socialLinks.style.transform = `translate(${rotateY * 0.3}px, ${rotateX * 0.3}px)`;
    });

    function update3DEffect() {
      const smoothFactor = 0.2;
      targetRotateX += (rotateX - targetRotateX) * smoothFactor;
      targetRotateY += (rotateY - targetRotateY) * smoothFactor;

      instructorSection.style.transform = `perspective(1000px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg)`;

      const shadowX = targetRotateY * 2;
      const shadowY = targetRotateX * 2;
      instructorSection.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.5)`;
      requestAnimationFrame(update3DEffect);
    }
    update3DEffect();
  }

  // 5. Hiệu ứng text glow khi hover
  function addTextGlowEffect() {
    const textElements = instructorSection.querySelectorAll('h3, p, .skill-badge');

    textElements.forEach(text => {
      text.addEventListener('mouseenter', () => {
        text.style.textShadow = '0 0 15px rgba(97, 218, 251, 1)';
        text.style.transition = 'text-shadow 0.3s ease';
      });

      text.addEventListener('mouseleave', () => {
        text.style.textShadow = 'none';
      });
    });
  }

  // Khởi tạo tất cả hiệu ứng
  createParticlesEffect();
  createGradientMorph();
  createLightWave();
  addAdvanced3DEffect();
  addTextGlowEffect();

  // Thêm CSS động
  const style = document.createElement('style');
  style.textContent = `
    .instructor-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 2;
    }
    
    .instructor-particle {
      position: absolute;
      width: var(--size);
      height: var(--size);
      background: rgba(97, 218, 251, 0.8);
      border-radius: 50%;
      animation: float var(--duration) var(--delay) infinite ease-in-out;
      filter: blur(1px);
    }
    
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(var(--distance), calc(var(--distance) * -0.7)); }
      50% { transform: translate(calc(var(--distance) * 0.3), calc(var(--distance) * -1.5)); }
      75% { transform: translate(calc(var(--distance) * -0.8), calc(var(--distance) * -0.3)); }
    }
    
    .instructor-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      mix-blend-mode: overlay;
      pointer-events: none;
    }
    
    .instructor-wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      transform-origin: center;
    }
    
    .instructor {
      transform-style: preserve-3d;
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      position: relative;
    }
    
    .instructor img {
      transition: transform 0.5s ease;
    }
    
    .social-links {
      transition: transform 0.5s ease;
    }
  `;
  document.head.appendChild(style);
});
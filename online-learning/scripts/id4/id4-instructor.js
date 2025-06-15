// instructor-effects.js
document.addEventListener('DOMContentLoaded', function() {
    const instructorSection = document.querySelector('.instructor');
    if (!instructorSection) return;
  
    // 1. Particles bay theo chuột
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
  
    // 2. Gradient morphing với màu Ubuntu
    function createGradientMorph() {
      const gradientBg = document.createElement('div');
      gradientBg.className = 'instructor-gradient';
      instructorSection.prepend(gradientBg);
  
      let hue = 0;
      function animateGradient() {
        hue = (hue + 0.5) % 360;
        gradientBg.style.background = `radial-gradient(circle at 75% 25%, var(--ubuntu-orange), var(--ubuntu-purple))`;
        gradientBg.style.opacity = '0.3';
        requestAnimationFrame(animateGradient);
      }
      animateGradient();
    }
  
    // 3. Sóng ánh sáng với màu Ubuntu
    function createLightWave() {
      const wave = document.createElement('div');
      wave.className = 'instructor-wave';
      instructorSection.appendChild(wave);
  
      let posY = 100;
      let direction = 1;
      function animateWave() {
        posY += 0.5 * direction;
        if (posY > 120 || posY < 80) direction *= -1;
        
        wave.style.background = `linear-gradient(0deg, transparent, rgba(233, 84, 32, ${0.4 + Math.sin(Date.now()/1000) * 0.2}), transparent)`;
        wave.style.transform = `translateY(${posY}%) scaleY(${0.5 + Math.sin(Date.now()/800) * 0.3})`;
        requestAnimationFrame(animateWave);
      }
      animateWave();
    }
  
    // 4. Hover 3D nâng cao
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
        instructorSection.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(119, 33, 111, 0.5)`; // --ubuntu-purple
        requestAnimationFrame(update3DEffect);
      }
      update3DEffect();
    }
  
    // 5. Text glow với màu Ubuntu
    function addTextGlowEffect() {
      const textElements = instructorSection.querySelectorAll('h3, p, .skill-badge');
      textElements.forEach(text => {
        text.addEventListener('mouseenter', () => {
          text.style.textShadow = '0 0 15px rgba(233, 84, 32, 1)'; // --ubuntu-orange
          text.style.transition = 'text-shadow 0.3s ease';
        });
        text.addEventListener('mouseleave', () => {
          text.style.textShadow = 'none';
        });
      });
    }
  
    createParticlesEffect();
    createGradientMorph();
    createLightWave();
    addAdvanced3DEffect();
    addTextGlowEffect();
  });
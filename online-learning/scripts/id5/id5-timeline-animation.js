class QuantumTimeline {
    constructor() {
      this.config = {
        timelineContainer: '.glass-timeline',
        timelineItem: '.timeline-item',
        itemContent: '.timeline-content',
        verticalLine: '.timeline-line',
        itemDot: '.timeline-dot',
        enableGlow: true,
        particleDensity: 6,
        colors: {
          primary: '#61dafb',
          secondary: '#2a7de1',
          background: '#ffffff'
        }
      };
      
      this.init();
    }
  
    init() {
      this.centerVerticalLine();
      this.removeHorizontalLines();
      this.createDots();
      this.createParticles();
      this.setupAnimations();
  
      window.addEventListener('resize', () => {
        this.updateDotsPosition();
        this.updateParticlesPosition();
        this.centerVerticalLine();
      });
    }
  
    centerVerticalLine() {
      const line = document.querySelector(this.config.verticalLine);
      if (!line) return;
  
      const updateLinePosition = () => {
        if (window.innerWidth <= 768) {
          line.style.display = 'none'; // Ẩn thanh dọc trên mobile
        } else {
          line.style.display = 'block'; // Hiển thị trên desktop
          line.style.left = '50%';
          line.style.transform = 'translateX(-50%)';
        }
      };
  
      // Chỉ áp dụng style cơ bản, không ghi đè display
      line.style.cssText = `
        position: absolute;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(
          to bottom, 
          ${this.config.colors.primary}, 
          ${this.config.colors.secondary}
        );
        z-index: 1;
      `;
  
      if (this.config.enableGlow) {
        line.style.boxShadow = `
          0 0 8px ${this.config.colors.primary},
          0 0 16px rgba(97, 218, 251, 0.3)
        `;
      }
  
      updateLinePosition();
      window.addEventListener('resize', updateLinePosition);
    }
  
    removeHorizontalLines() {
      document.querySelectorAll('.horizontal-line').forEach(line => {
        line.remove();
      });
    }
  
    createDots() {
      const items = document.querySelectorAll(this.config.timelineItem);
      const line = document.querySelector(this.config.verticalLine);
      const container = document.querySelector(this.config.timelineContainer);
      if (!container) return;
  
      items.forEach(item => {
        const dot = document.createElement('div');
        dot.className = this.config.itemDot.substring(1);
        container.appendChild(dot);
        this.positionDot(dot, item, line, container);
      });
    }
  
    positionDot(dot, item, line, container) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
  
      const dotLeft = window.innerWidth <= 768 
        ? 10 - containerRect.left  // Cố định ở mép trái trên mobile
        : (line && line.style.display !== 'none' 
            ? line.getBoundingClientRect().left - containerRect.left + line.getBoundingClientRect().width / 2 
            : containerRect.width / 2); // Căn giữa trên desktop nếu có thanh dọc
      const dotTop = itemRect.top - containerRect.top + itemRect.height / 2;
  
      dot.style.cssText = `
        position: absolute;
        left: ${dotLeft}px;
        top: ${dotTop}px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${this.config.colors.primary};
        transform: translate(-50%, -50%);
        z-index: 3;
        box-shadow: 
          0 0 0 3px ${this.config.colors.background},
          0 0 0 6px rgba(97, 218, 251, 0.3);
      `;
  
      const pulse = dot.querySelector('div') || document.createElement('div');
      pulse.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: inherit;
        animation: pulse 2s infinite;
        opacity: 0.7;
      `;
      if (!dot.contains(pulse)) dot.appendChild(pulse);
    }
  
    updateDotsPosition() {
      const items = document.querySelectorAll(this.config.timelineItem);
      const dots = document.querySelectorAll(this.config.itemDot);
      const line = document.querySelector(this.config.verticalLine);
      const container = document.querySelector(this.config.timelineContainer);
      if (!container) return;
  
      items.forEach((item, index) => {
        const dot = dots[index];
        if (dot) this.positionDot(dot, item, line, container);
      });
    }
  
    createParticles() {
      const line = document.querySelector(this.config.verticalLine);
      const container = document.querySelector(this.config.timelineContainer);
      if (!container) return;
  
      const particleContainer = document.createElement('div');
      particleContainer.className = 'particle-container';
      particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      `;
      container.appendChild(particleContainer);
  
      this.generateParticles(particleContainer, line);
    }
  
    generateParticles(container, line) {
      const containerRect = container.getBoundingClientRect();
      const density = window.innerWidth <= 768 ? this.config.particleDensity * 5 : this.config.particleDensity * 15;
  
      for (let i = 0; i < density; i++) {
        const particle = document.createElement('div');
        particle.className = 'timeline-particle';
  
        const baseLeft = window.innerWidth <= 768 
          ? Math.random() * containerRect.width 
          : (line && line.style.display !== 'none' 
              ? line.getBoundingClientRect().left - containerRect.left + line.getBoundingClientRect().width / 2 
              : containerRect.width / 2);
  
        particle.style.cssText = `
          position: absolute;
          left: ${baseLeft}px;
          top: ${Math.random() * containerRect.height}px;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: ${this.config.colors.primary};
          border-radius: 50%;
          opacity: ${Math.random() * 0.5 + 0.2};
          transform: translate(-50%, -50%);
        `;
  
        container.appendChild(particle);
        this.animateParticle(particle);
      }
    }
  
    updateParticlesPosition() {
      const particleContainer = document.querySelector('.particle-container');
      const line = document.querySelector(this.config.verticalLine);
      if (!particleContainer) return;
  
      particleContainer.innerHTML = '';
      this.generateParticles(particleContainer, line);
    }
  
    animateParticle(particle) {
      gsap.to(particle, {
        y: `+=${Math.random() * 60 - 30}`,
        x: `+=${Math.random() * 20 - 10}`,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  
    setupAnimations() {
      gsap.from(this.config.timelineItem, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
  
      document.querySelectorAll(this.config.timelineItem).forEach(item => {
        const content = item.querySelector(this.config.itemContent);
  
        item.addEventListener('mouseenter', () => {
          gsap.to(content, {
            y: -3,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            duration: 0.25
          });
        });
  
        item.addEventListener('mouseleave', () => {
          gsap.to(content, {
            y: 0,
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            duration: 0.25
          });
        });
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
      new QuantumTimeline();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
      script.onload = () => new QuantumTimeline();
      document.head.appendChild(script);
    }
  });
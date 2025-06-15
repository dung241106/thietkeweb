// faq.js
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    function closeAllFaqs() {
      faqItems.forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
      });
    }
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        closeAllFaqs();
        
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
    
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        faqItems.forEach(item => {
          if (item.classList.contains('active')) {
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }, 100);
    });
  });
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Hàm đóng tất cả các FAQ
    function closeAllFaqs() {
      faqItems.forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
      });
    }
    
    // Xử lý click cho mỗi FAQ
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Đóng tất cả các FAQ khác
        closeAllFaqs();
        
        // Nếu FAQ hiện tại chưa active thì mở nó
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
    
    // Tự động điều chỉnh chiều cao khi resize
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
    
    // Mở FAQ đầu tiên khi load trang (tuỳ chọn)
    // faqItems[0].classList.add('active');
    // faqItems[0].querySelector('.faq-answer').style.maxHeight = 
    //   faqItems[0].querySelector('.faq-answer').scrollHeight + 'px';
  });
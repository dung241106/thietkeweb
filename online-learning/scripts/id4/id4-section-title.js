// section-title.js
document.addEventListener('DOMContentLoaded', function() {
  const sectionTitles = document.querySelectorAll('.section-title');

  function updateSectionTitleLines() {
    sectionTitles.forEach(title => {
      const titleWidth = title.offsetWidth;
      const parentWidth = title.parentElement.offsetWidth;
      
      // Tính khoảng cách từ mép tiêu đề đến mép thanh nhỏ
      const baseOffset = 60; // Khoảng cách cơ bản (có thể điều chỉnh)
      const maxLineWidth = 110; // Khoảng cách tối đa từ giữa đến mép thanh (có thể điều chỉnh)

      // Tính vị trí động dựa trên chiều rộng tiêu đề
      const leftPosition = (parentWidth - titleWidth) / 2 - maxLineWidth;
      const rightPosition = (parentWidth - titleWidth) / 2 - maxLineWidth;

      // Cập nhật vị trí của ::before và ::after
      title.style.setProperty('--before-left', `${leftPosition}px`);
      title.style.setProperty('--after-right', `${rightPosition}px`);
    });
  }

  // Gọi hàm khi load trang
  updateSectionTitleLines();

  // Cập nhật khi resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSectionTitleLines, 100);
  });

  // Cập nhật khi scroll (nếu tiêu đề di chuyển)
  window.addEventListener('scroll', updateSectionTitleLines);
});
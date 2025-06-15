// Sau khi DOM đã load xong, ta gắn event cho các khóa học
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả các card khoá học
    const courseCards = document.querySelectorAll(".course-card");
  
    // Duyệt mỗi card
    courseCards.forEach((card) => {
      card.addEventListener("click", function() {
        // Lấy ID từ attribute data-id
        const courseId = card.getAttribute("data-id");
  
        // Điều hướng sang trang course-detail
        // Tham số ?id=... để ta có thể lấy ID trên trang chi tiết
        window.location.href = `course-detail.html?id=${courseId}`;
      });
    });
  });
  
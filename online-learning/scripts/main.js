/* scripts/main.js */

// ------------------------------------------------------------------
// DỮ LIỆU MẪU BAN ĐẦU (Courses) - Nếu localStorage chưa có
// ------------------------------------------------------------------
/* scripts/main.js */

// ------------------------------------------------------------------
// DỮ LIỆU MẪU BAN ĐẦU (Courses) - Nếu localStorage chưa có
// ------------------------------------------------------------------
const defaultCourses = [
    {
      id: 1,
      title: "HTML Cơ Bản",
      description: "Tìm hiểu về các thẻ HTML và cấu trúc cơ bản của 1 trang web.",
      videoUrl: "https://www.youtube.com/embed/ub1Dc3NHZ3s",
      quiz: {
        question: "Thẻ nào dùng để tạo 1 đoạn văn bản trong HTML?",
        options: ["<div>", "<p>", "<section>", "<span>"],
        answer: 1 // index của đáp án đúng (tức <p>)
      }
    },
    {
      id: 2,
      title: "JavaScript Cơ Bản",
      description: "Nhập môn JavaScript: các kiểu dữ liệu, biến, vòng lặp, hàm, v.v.",
      videoUrl: "https://www.youtube.com/embed/0ZGBGTUuazo",
      quiz: {
        question: "Lệnh nào dùng để hiển thị nội dung lên console?",
        options: ["alert()", "prompt()", "console.log()", "confirm()"],
        answer: 2
      }
    },
    {
      id: 3,
      title: "JavaScript Nâng Cao",
      description: "Học về async, callback, promise, async/await, OOP trong JavaScript.",
      videoUrl: "https://www.youtube.com/embed/o1IaduQICO0",
      quiz: {
        question: "Từ khoá nào dùng để khai báo 1 class trong JS ES6+?",
        options: ["class", "constructor", "function", "method"],
        answer: 0
      }
    },
    {
      id: 4,
      title: "WSL Ubuntu",
      description: "Hướng dẫn cài đặt và sử dụng Ubuntu trên Windows với WSL.",
      videoUrl: "https://www.youtube.com/embed/7RQ3QNujqJQ",
      quiz: {
        question: "WSL viết tắt của cụm từ nào?",
        options: [
          "Windows Subsystem for Linux",
          "Windows System Linux",
          "Window Service Linux",
          "Win-Linux Shared Layer"
        ],
        answer: 0
      }
    },
    {
      id: 5,
      title: "Xây Dựng Website với ReactJS",
      description: "Giới thiệu thư viện React, JSX, components, state, props, hooks...",
      videoUrl: "https://www.youtube.com/embed/kVEguaQWGAY",
      quiz: {
        question: "Lệnh nào dùng để tạo 1 dự án React mới?",
        options: [
          "create-react-app my-app",
          "npm init react-app",
          "npm run react-create my-app",
          "react my-app"
        ],
        answer: 0
      }
    },
    {
      id: 6,
      title: "Node & ExpressJS",
      description: "Tạo server với Node.js và Express, xây dựng RESTful API, routing...",
      videoUrl: "https://www.youtube.com/embed/1z4yYo_2zOQ",
      quiz: {
        question: "Câu lệnh cài đặt ExpressJS bằng npm?",
        options: [
          "npm install express",
          "npm install expressjs",
          "npm install node-express",
          "npm install server-express"
        ],
        answer: 0
      }
    },
    {
      id: 7,
      title: "HTML CSS Pro",
      description: "Khóa học HTML/CSS chuyên sâu, thực hành thiết kế web chuyên nghiệp.",
      videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
      quiz: {
        question: "Thuộc tính nào trong CSS dùng để canh giữa (center) một phần tử block?",
        options: [
          "text-align: center",
          "margin: auto",
          "vertical-align: middle",
          "align-content: center"
        ],
        answer: 1
      }
    }
  ];
  
  // ------------------------------------------------------------------
  // (Các hàm getCoursesFromStorage, saveCoursesToStorage, renderCourseList, ...
  //  vẫn giữ nguyên như bạn đã có)
  // ------------------------------------------------------------------
  
  // ------------------------------------------------------------------
  // LẤY KHÓA HỌC TỪ localStorage HOẶC TẠO MẶC ĐỊNH
  // ------------------------------------------------------------------
  function getCoursesFromStorage() {
    const courses = localStorage.getItem("courses");
    if (courses) {
      return JSON.parse(courses);
    } else {
      // nếu chưa có thì set mặc định
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      return defaultCourses;
    }
  }
  
  // Lưu lại khi có thay đổi
  function saveCoursesToStorage(courses) {
    localStorage.setItem("courses", JSON.stringify(courses));
  }
  
  // ------------------------------------------------------------------
  // HIỂN THỊ DANH SÁCH KHÓA HỌC Ở TRANG CHỦ (index.html)
  // ------------------------------------------------------------------
  function renderCourseList() {
    const courseListEl = document.getElementById("courseList");
    if (!courseListEl) return; // nếu không có element này, thoát
  
    const courses = getCoursesFromStorage();
    courseListEl.innerHTML = "";
  
    courses.forEach(course => {
      const div = document.createElement("div");
      div.className = "course-item";
  
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button onclick="goToCourseDetails(${course.id})">Xem chi tiết</button>
      `;
      courseListEl.appendChild(div);
    });
  }
  
  // Di chuyển sang trang course-details kèm ID khoá học
  function goToCourseDetails(courseId) {
    // courseId ở đây là dạng số (nếu bạn parseInt) hoặc chuỗi (nếu lấy từ getAttribute)
    // nên cẩn thận so sánh bằng == hoặc === (với parseInt).
  
    if (parseInt(courseId) === 1) {
      // Nếu ID = 1 -> sang file đặc biệt
      window.location.href = 'course-details-id1.html?id=1';
    } else {
      // Ngược lại -> sang file course-details.html bình thường
      window.location.href = `course-details.html?id=${courseId}`;
    }
  }
  
  
  // ------------------------------------------------------------------
  // LẤY THÔNG TIN KHÓA HỌC THEO ID (phục vụ course-details.html)
  // ------------------------------------------------------------------
  function getCourseById(courseId) {
    const courses = getCoursesFromStorage();
    return courses.find(c => c.id === parseInt(courseId));
  }
  
  // ------------------------------------------------------------------
  // HIỂN THỊ CHI TIẾT KHÓA HỌC & QUIZ (course-details.html)
  // ------------------------------------------------------------------
  function renderCourseDetails() {
    const detailsContainer = document.getElementById("courseDetails");
    if (!detailsContainer) return;
  
    // Lấy ID từ URL (vd: ?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    if (!courseId) return;
  
    const course = getCourseById(courseId);
    if (!course) {
      detailsContainer.innerHTML = "<p>Không tìm thấy khóa học.</p>";
      return;
    }
  
    // Render chi tiết
    detailsContainer.innerHTML = `
      <h2>${course.title}</h2>
      <p>${course.description}</p>
    `;
  
    // Render video
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = `
      <iframe width="560" height="315" src="${course.videoUrl}"
        title="Course Video" frameborder="0" allowfullscreen>
      </iframe>
    `;
  
    // Render Quiz
    const quizContainer = document.getElementById("quizContainer");
    if (course.quiz) {
      quizContainer.innerHTML = `
        <div class="quiz-question">${course.quiz.question}</div>
        <ul class="quiz-options">
          ${course.quiz.options
            .map(
              (opt, idx) => `
                <li>
                  <label>
                    <input type="radio" name="quizOption" value="${idx}" />
                    ${opt}
                  </label>
                </li>
              `
            )
            .join("")}
        </ul>
        <button class="quiz-submit" onclick="submitQuiz(${course.id})">Nộp bài</button>
        <div id="quizResult" class="quiz-result"></div>
      `;
    } else {
      quizContainer.innerHTML = "<p>Chưa có quiz cho khoá này.</p>";
    }
  }
  
  // Xử lý khi người dùng bấm Nộp bài quiz
  function submitQuiz(courseId) {
    const course = getCourseById(courseId);
    const selected = document.querySelector("input[name='quizOption']:checked");
    const resultEl = document.getElementById("quizResult");
  
    if (!selected) {
      resultEl.textContent = "Bạn chưa chọn đáp án.";
      return;
    }
  
    const userAnswer = parseInt(selected.value); 
    if (userAnswer === course.quiz.answer) {
      resultEl.textContent = "Chúc mừng! Bạn trả lời đúng.";
    } else {
      resultEl.textContent = "Bạn đã trả lời sai. Hãy thử lại!";
    }
  }
  
  // ------------------------------------------------------------------
  // QUẢN LÝ ADMIN: THÊM/SỬA/XÓA KHÓA HỌC (admin.html)
  // ------------------------------------------------------------------
  function renderAdminCourseList() {
    const adminListEl = document.getElementById("adminCourseList");
    if (!adminListEl) return;
  
    const courses = getCoursesFromStorage();
    adminListEl.innerHTML = "";
  
    courses.forEach(course => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>[ID: ${course.id}]</strong> ${course.title}
        <button onclick="deleteCourse(${course.id})" style="margin-left: 1rem;">Xóa</button>
      `;
      adminListEl.appendChild(li);
    });
  }
  
  // Thêm khóa học
  function addCourse(event) {
    event.preventDefault();
    const titleInput = document.getElementById("courseTitle");
    const descInput = document.getElementById("courseDesc");
    const videoInput = document.getElementById("courseVideo");
  
    const courses = getCoursesFromStorage();
    
    // Tạo ID mới = lấy ID lớn nhất + 1
    let newId = 1;
    if (courses.length > 0) {
      newId = courses[courses.length - 1].id + 1;
    }
  
    const newCourse = {
      id: newId,
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      videoUrl: videoInput.value.trim(),
      quiz: {
        question: "Câu hỏi demo?",
        options: ["A", "B", "C", "D"],
        answer: 0
      }
    };
  
    courses.push(newCourse);
    saveCoursesToStorage(courses);
  
    // reset form
    titleInput.value = "";
    descInput.value = "";
    videoInput.value = "";
  
    // render lại danh sách
    renderAdminCourseList();
    alert("Thêm khóa học thành công!");
  }
  
  // Xóa khóa học
  function deleteCourse(courseId) {
    let courses = getCoursesFromStorage();
    courses = courses.filter(c => c.id !== courseId);
    saveCoursesToStorage(courses);
    renderAdminCourseList();
    alert("Đã xóa khóa học.");
  }
  
  // ------------------------------------------------------------------
  // ĐĂNG NHẬP GIẢ LẬP (login.html)
  // - Admin => username: admin, password: 123
  // - User => username: user,  password: 123
  // ------------------------------------------------------------------
  function doLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    // Giả lập
    if (username === "admin" && password === "123") {
      localStorage.setItem("loggedInUser", JSON.stringify({role: "admin"}));
      alert("Đăng nhập thành công (ADMIN)!");
      window.location.href = "admin.html";
    } else if (username === "user" && password === "123") {
      localStorage.setItem("loggedInUser", JSON.stringify({role: "user"}));
      alert("Đăng nhập thành công (USER)!");
      window.location.href = "index.html";
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  }
  
  // Kiểm tra role, nếu không phải admin thì chuyển về index
  function checkAdminAccess() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      alert("Bạn phải đăng nhập trước!");
      window.location.href = "login.html";
      return;
    }
    const userObj = JSON.parse(user);
    if (userObj.role !== "admin") {
      alert("Bạn không có quyền truy cập trang admin!");
      window.location.href = "index.html";
    }
  }
  
  // ------------------------------------------------------------------
  // CALL TRONG onload Ở TỪNG TRANG
  // ------------------------------------------------------------------
  // scripts/main.js

// ... các hàm cũ: renderCourseList(), renderCourseDetails(), v.v. ...

// Khi trang index.html load xong, gắn event click cho từng card:
document.addEventListener("DOMContentLoaded", function() {
    // Tìm tất cả thẻ có class "course-card"
    const courseCards = document.querySelectorAll(".course-card");
  
    // Gắn sự kiện click
    courseCards.forEach((card) => {
      card.addEventListener("click", function() {
        // Lấy ID từ data-id
        const courseId = card.getAttribute("data-id");
  
        // Chuyển sang course-details.html?id=<ID>
        window.location.href = `course-details.html?id=${courseId}`;
      });
    });
  });
  
  
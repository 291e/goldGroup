class HeaderComponent extends HTMLElement {
  connectedCallback() {
    // 메뉴 데이터 배열
    const menuItems = [
      { name: "BRAND", link: "brand.html" },
      { name: "혼주한복", link: "honju.html" },
      { name: "신랑신부한복", link: "wedding.html" },
      { name: "여성한복", link: "women.html" },
      { name: "아동한복", link: "children.html" },
      { name: "돌잔치한복", link: "firstbirthday.html" },
      { name: "맞춤한복", link: "custom.html" },
      { name: "생활한복", link: "daily.html" },
      { name: "화보촬영", link: "photoshoot.html" },
      { name: "협찬", link: "sponsorship.html" },
      { name: "COMMUNITY", link: "community.html" },
    ];

    // 헤더 HTML 구조
    this.innerHTML = `
      <div class="header">
        <div class="inner">
          
          <nav class="menu">
          <a href="/" class="logo-wrapper">
            <img src="public/logo.jpg" alt="logo" class="logo" />
          </a>
            ${menuItems
              .map(
                (item) =>
                  `<a href="${item.link}" class="innerHeader">${item.name}</a>`
              )
              .join("")}
          </nav>
        </div>
      </div>
    `;
  }

  // HTML 페이지를 로드하여 렌더링
  loadPage(link) {
    const mainContent = document.querySelector("main"); // 렌더링할 컨테이너
    fetch(link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("페이지를 불러올 수 없습니다.");
        }
        return response.text();
      })
      .then((html) => {
        mainContent.innerHTML = html; // 컨테이너에 HTML 삽입
        window.history.pushState(null, "", link); // 브라우저 히스토리 업데이트
      })
      .catch((error) => {
        mainContent.innerHTML =
          "<h1>404: 페이지를 불러오는 데 실패했습니다.</h1>";
        console.error(error);
      });
  }
}

// 컴포넌트 정의
customElements.define("header-component", HeaderComponent);

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 80) {
    header.classList.add("headerFixed");
  } else {
    header.classList.remove("headerFixed");
  }
});

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  const headerLayout = document.querySelector("header-component");
  if (window.scrollY < 80) {
    headerLayout.classList.add("headerPlace");
  } else {
    headerLayout.classList.remove("headerPlace");
  }
});

export default HeaderComponent;

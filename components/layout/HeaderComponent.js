class HeaderComponent extends HTMLElement {
  connectedCallback() {
    const menuItems = [
      { name: "BRAND", link: "brand.html" },
      { name: "혼주한복", link: "product/honju.html" },
      { name: "신랑신부한복", link: "product/wedding.html" },
      { name: "여성한복", link: "product/women.html" },
      { name: "아동한복", link: "product/children.html" },
      { name: "돌잔치한복", link: "product/firstbirthday.html" },
      { name: "맞춤한복", link: "product/custom.html" },
      { name: "생활한복", link: "product/daily.html" },
      { name: "화보촬영", link: "photoshoot.html" },
      { name: "협찬", link: "sponsorship.html" },
      { name: "COMMUNITY", link: "community.html" },
    ];

    this.innerHTML = `
      <div class="header">
        <div class="inner">
          <!-- 로고 -->
          <a href="http://goldsilk.metashopping.kr/goldGroup/" class="logo-wrapper">
            <img src="public/logo.jpg" alt="logo" class="logo" />
          </a>

          <!-- 데스크톱 메뉴 -->
          <nav class="menu">
            ${menuItems
              .map(
                (item) =>
                  `<a href="${item.link}" class="innerHeader">${item.name}</a>`
              )
              .join("")}
          </nav>

          <!-- 햄버거 메뉴 -->
          <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <!-- 모바일 메뉴 -->
        <div class="mobile-menu">
          ${menuItems
            .map(
              (item) =>
                `<a href="${item.link}" class="mobile-menu-item">${item.name}</a>`
            )
            .join("")}
        </div>
      </div>
    `;

    // 햄버거 메뉴 클릭 이벤트
    const hamburgerIcon = this.querySelector(".hamburger-icon");
    const mobileMenu = this.querySelector(".mobile-menu");
    hamburgerIcon.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // 메뉴 외부 클릭 시 메뉴 닫기
    document.addEventListener("click", (event) => {
      const isClickInsideMenu =
        mobileMenu.contains(event.target) ||
        hamburgerIcon.contains(event.target);
      if (!isClickInsideMenu) {
        mobileMenu.classList.remove("open");
      }
    });
  }
}

customElements.define("header-component", HeaderComponent);

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  const headerLayout = document.querySelector("header-component");
  const header = document.querySelector(".header");
  if (window.scrollY > 80) {
    header.classList.add("headerFixed");
    headerLayout.classList.remove("headerPlace");
    headerLayout.classList.add("headerPlaceFixed");
  } else {
    header.classList.remove("headerFixed");
    headerLayout.classList.add("headerPlace");
    headerLayout.classList.remove("headerPlaceFixed");
  }
});

export default HeaderComponent;

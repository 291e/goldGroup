class HeaderComponent extends HTMLElement {
  connectedCallback() {
    // 메뉴 데이터 배열에 name과 link 추가
    const menuItems = [
      { name: "BRAND", link: "/brand" },
      { name: "혼주한복", link: "/honju" },
      { name: "신랑신부한복", link: "/wedding" },
      { name: "여성한복", link: "/women" },
      { name: "아동한복", link: "/children" },
      { name: "돌잔치한복", link: "/firstbirthday" },
      { name: "맞춤한복", link: "/custom" },
      { name: "생활한복", link: "/daily" },
      { name: "화보촬영", link: "/photoshoot" },
      { name: "협찬", link: "/sponsorship" },
      { name: "COMMUNITY", link: "/community" },
    ];

    // 헤더 HTML 구조
    this.innerHTML = `
      <div class="header">
        <div class="inner">
          <a href="/" class="logo-wrapper">
            <img src="public/logo.jpg" alt="logo" class="logo" />
          </a>
          <nav class="menu">
            ${menuItems
              .map(
                (item) =>
                  `<div class="innerHeader" data-link="${item.link}">${item.name}</div>`
              )
              .join("")}
          </nav>
        </div>
      </div>
    `;

    // 메뉴 클릭 이벤트 추가
    this.querySelectorAll(".innerHeader").forEach((menu) => {
      menu.addEventListener("click", (event) => {
        const link = event.target.dataset.link; // data-link에서 URL 가져오기
        if (link) {
          event.preventDefault(); // 기본 동작 방지
          window.history.pushState(null, "", link); // URL 변경
          // navigate 이벤트 디스패치
          this.dispatchEvent(new CustomEvent("navigate", { detail: { link } }));
        }
      });
    });
  }
}

// 컴포넌트 정의
customElements.define("header-component", HeaderComponent);

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 80) {
    header.classList.add("headerFixed");
  } else {
    header.classList.remove("headerFixed");
  }
});

export default HeaderComponent;

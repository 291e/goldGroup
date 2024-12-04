class WidgetComponent extends HTMLElement {
  connectedCallback() {
    // HTML 구조 생성
    this.innerHTML = `
          <div class="widget">
            <div class="widget-button" data-action="kakao"><i class="fa-regular fa-comment"></i></div>
            <div class="widget-button" data-action="instagram"><i class="fa-brands fa-instagram"></i></div>
            <div class="widget-button" data-action="blog"><i class="fa-brands fa-blogger"></i></div>
            <div class="widget-button" data-action="youtube"><i class="fa-brands fa-youtube"></i></div>
            <div class="widget-button" data-action="scroll-top"><i class="fa-solid fa-arrow-up"></i></div>
            <div class="widget-button" data-action="scroll-bottom"><i class="fa-solid fa-arrow-down"></i></div>
          </div>
        `;

    // 이벤트 리스너 등록
    this.querySelectorAll(".widget-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        switch (action) {
          case "kakao":
            alert("카카오톡 버튼 클릭");
            break;
          case "instagram":
            alert("인스타그램 버튼 클릭");
            break;
          case "blog":
            alert("네이버 블로그 버튼 클릭");
            break;
          case "youtube":
            alert("유튜브 버튼 클릭");
            break;
          case "scroll-top":
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
          case "scroll-bottom":
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
            break;
          default:
            console.log("알 수 없는 동작");
        }
      });
    });

    // 스크롤 이벤트 등록
    const widget = this.querySelector(".widget");
    widget.style.display = "none"; // 초기 상태: 숨김

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        widget.style.display = "flex"; // 스크롤 내리면 표시
      } else {
        widget.style.display = "none"; // 스크롤 위로 올라가면 숨김
      }
    });
  }
}

// 컴포넌트 등록
if (!customElements.get("widget-component")) {
  customElements.define("widget-component", WidgetComponent);
}

export default WidgetComponent;

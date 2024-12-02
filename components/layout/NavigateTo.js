import Navigo from "navigo";

// 라우터 초기화
const router = new Navigo("/");

// 라우팅 설정
router
  .on("/", () => {
    renderHome();
  })
  .on("/brand", () => {
    renderBrand();
  })
  .on("/honju", () => {
    renderHonju();
  })
  .on("/wedding", () => {
    renderWedding();
  })
  .notFound(() => {
    document.querySelector("main").innerHTML =
      "<h1>404: 페이지를 찾을 수 없습니다</h1>";
  })
  .resolve();

// 각 페이지 렌더링 함수
function renderHome() {
  document.querySelector("main").innerHTML = `
    <widget-component></widget-component>
      <slider-component></slider-component>
      <banner-component></banner-component>
      <div class="videoWrapper">
        <div class="mainVideo">
          <iframe
            src="https://www.youtube.com/embed/ohBa5-JRP1U?autoplay=1&mute=1&rel=0&controls=1&playsinline=1"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <recommend-component></recommend-component>

      <div class="longBanner">
        <a href="/">
          <img
            src="public/longBanner/main_longbanner01.jpg"
            alt="main_longbanner01"
          />
        </a>
      </div>

      <new-product-component class="fade-in"></new-product-component>

      <div class="longBanner">
        <a href="/">
          <img
            src="public/longBanner/main_longbanner02.jpg"
            alt="main_longbanner01"
          />
        </a>
      </div>

      <best-product-component class="fade-in"></best-product-component>

      <div class="longBanner">
        <a href="/">
          <img
            src="public/longBanner/main_longbanner03.jpg"
            alt="main_longbanner01"
          />
        </a>
      </div>

      <div class="longBanner">
        <a href="/">
          <div class="banner-container">
            <img
              src="public/longBanner/main_full_banner.jpg"
              alt="main_longbanner01"
              class="banner-image"
            />
          </div>
        </a>
        <div class="longBanner-text fade-in">
          <span>Brand Information</span>
          <span
            >황금단은 전통 한복 특유의 아름다움에 독창적인 디자인을 접목해,
            <br />
            오트쿠튀르를 표방하는 한국 전통 브랜드입니다.</span
          >
          <button class="moreBtn">
            <p>More</p>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <review-slider-component class="fade-in"></review-slider-component>

      <div style="width: 100%; display: flex; justify-content: center">
        <button class="moreBtn reverse">
          <p>More</p>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <instagram-component></instagram-component>

  `;
}

function renderBrand() {
  document.querySelector("main").innerHTML = `
    <brand-component></brand-component>
  `;
}

function renderHonju() {
  document.querySelector("main").innerHTML = `
    <h1>혼주한복</h1>
    <p>혼주한복에 대한 설명이 들어갑니다.</p>
  `;
}

function renderWedding() {
  document.querySelector("main").innerHTML = `
    <h1>신랑신부한복</h1>
    <p>신랑신부 한복에 대한 설명이 들어갑니다.</p>
  `;
}

export default router;

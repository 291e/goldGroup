class RecommendComponent extends HTMLElement {
  connectedCallback() {
    // 슬라이드 데이터
    const products = [
      {
        id: 1,
        image: "public/product/product01.jpg",
        name: "Product 1",
        price: "$100",
      },
      {
        id: 2,
        image: "public/product/product02.jpg",
        name: "Product 2",
        price: "$120",
      },
      {
        id: 3,
        image: "public/product/product03.jpg",
        name: "Product 3",
        price: "$140",
      },
    ];

    // HTML 구조 생성
    this.innerHTML = `
            <div class="swiper">
            <div class="swiper-text">
            <span>추천상품</span>
            <span>황금단이 추천하는 상품</span>
            </div>
              <div class="swiper-wrapper">
                ${products
                  .map(
                    (product) => `
                    <div class="swiper-slide">
                      <div class="product" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-overlay">
                          <div class="product-text">
                            <span>${product.name}</span>
                            <span>${product.price}</span>
                          </div>
                          <button class="buy-button">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
              <!-- 네비게이션 버튼 -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
               <!-- 페이지네이션 -->
              <div class="swiper-pagination"></div>
           
            </div>
           
          `;

    // Swiper.js 초기화
    new Swiper(".swiper", {
      slidesPerView: 5, // 한 화면에 보이는 슬라이드 수
      spaceBetween: 20, // 슬라이드 간 간격
      loop: true, // 무한 루프
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000, // 자동 슬라이드 간격 (3초)
        disableOnInteraction: false, // 상호작용 후에도 자동 슬라이드 유지
      },
    });

    // 상품 클릭 이벤트 추가
    this.querySelectorAll(".product").forEach((product) => {
      product.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        if (productId) {
          window.location.href = `/product.html?id=${productId}`;
        }
      });
    });
  }
}

// 컴포넌트 정의
customElements.define("recommend-component", RecommendComponent);

export default RecommendComponent;

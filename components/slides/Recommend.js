import { fetchProducts } from "../../api/api.js"; // JSON 데이터를 가져오는 API 함수

class RecommendComponent extends HTMLElement {
  async connectedCallback() {
    try {
      // JSON 데이터 가져오기
      const allProducts = await fetchProducts();

      // 추천 상품 필터링 (임의로 tag에 "BEST"를 포함하는 상품을 추천으로 설정)
      const products = Object.values(allProducts).filter(
        (product) => product.tag
      );

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
                      <div class="product-image-wrapper">
                      <img src="${product.images[0]}" alt="${
                  product.name
                }" class="product-image">
                      <div class="product-overlay">
                        <div class="product-info">
                          <span>${product.name}</span>          
                          <span class="price">${product.price.toLocaleString()} 원</span>
                          <div class="tagBox">
                          ${product.tag
                            .map(
                              (tag) =>
                                `<span class="${
                                  tag === "NEW" ? "newTag" : "bestTag"
                                }">${tag}</span>`
                            )
                            .join("")}
                          </div>
                        </div>
                      </div>
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
            window.location.href = `./product.html?id=${productId}`;
          }
        });
      });
    } catch (error) {
      console.error("Failed to load recommended products:", error);
      this.innerHTML = `<p>추천 상품 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }
}

// 컴포넌트 정의
customElements.define("recommend-component", RecommendComponent);

export default RecommendComponent;

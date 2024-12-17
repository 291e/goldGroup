import { fetchProducts } from "../../api/api.js"; // JSON 데이터를 가져오는 API 함수
import { formatImagePath } from "../utils/image.js";

class RecommendComponent extends HTMLElement {
  async connectedCallback() {
    try {
      // JSON 데이터 가져오기
      const allProducts = await fetchProducts();

      // "BEST" 태그를 가진 상품만 필터링
      const products = allProducts
        .filter(
          (product) =>
            Array.isArray(product.tags) && product.tags.includes("BEST")
        )
        .slice(0, 10); // 최신 10개 상품만 가져오기

      // 데이터가 비어있을 경우 처리
      if (products.length === 0) {
        this.innerHTML = `<p>추천할 상품이 없습니다.</p>`;
        return;
      }

      // HTML 구조 생성
      this.innerHTML = `
        <div class="swiper">
          <div class="swiper-text">
            <span>추천상품</span>
            <span>황금단이 추천하는 상품</span>
          </div>
          <div class="swiper-wrapper">
            ${this.renderProducts(products)}
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
      this.addEventListeners();
    } catch (error) {
      console.error("Failed to load recommended products:", error);
      this.innerHTML = `<p>추천 상품 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }

  // 상품 리스트 HTML 생성
  renderProducts(products) {
    return products
      .map(
        (product) => `
          <div class="swiper-slide">
            <div class="product" data-id="${product.id || "N/A"}">
              <div class="product-image-wrapper">
                <img src="${formatImagePath(product.images?.[0])}" alt="${
          product.name || "상품 이미지"
        }" class="product-image">

                <div class="product-overlay">
                  <div class="product-info">
                    <span>${product.name || "상품명 없음"}</span>          
                    <span class="price">${
                      product.price
                        ? product.price.toLocaleString() + " 원"
                        : "가격 정보 없음"
                    }</span>
                    <div class="tagBox">
                      ${
                        product.tags
                          ?.map(
                            (tag) =>
                              `<span class="${
                                tag === "NEW" ? "newTag" : "bestTag"
                              }">${tag}</span>`
                          )
                          .join("") || ""
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }

  // 클릭 이벤트 추가
  addEventListeners() {
    this.querySelectorAll(".product").forEach((productElement) => {
      productElement.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        if (productId) {
          window.location.href = `./product.html?id=${productId}`;
        }
      });
    });
  }
}

// 컴포넌트 정의
customElements.define("recommend-component", RecommendComponent);

export default RecommendComponent;

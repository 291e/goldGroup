import { fetchProducts } from "../../api/api.js"; // JSON 데이터를 가져오는 API 함수
import { formatImagePath } from "../../utils/image.js";

class BestProductComponent extends HTMLElement {
  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    try {
      // 데이터 가져오기
      const allProducts = await fetchProducts();

      // "BEST" 태그를 가진 상품만 필터링
      this.products = allProducts
        .filter(
          (product) =>
            Array.isArray(product.tags) && product.tags.includes("BEST")
        )
        .slice(0, 10); // 최신 10개 상품만 가져오기

      await this.render(); // 비동기 렌더링
      this.addEventListeners();
    } catch (error) {
      console.error("Failed to load best products:", error);
      this.innerHTML = `<p>베스트셀러 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }

  // 비동기 렌더링 함수
  async render() {
    this.innerHTML = `
      <div class="best-product-container">
        <!-- 제목 -->
        <div class="swiper-text">
          <span>베스트셀러</span>
          <span>황금단에서 인기있는 상품</span>
        </div>
        
        <!-- 상품 리스트 -->
        <div class="Products">
          ${await this.renderProducts()}
        </div>
      </div>
    `;
  }

  // 베스트셀러 리스트 렌더링 (비동기 이미지 처리)
  async renderProducts() {
    if (this.products.length === 0) {
      return `<p>등록된 베스트셀러 상품이 없습니다.</p>`;
    }

    const renderedProducts = await Promise.all(
      this.products.map(async (product) => {
        const imagePath = await formatImagePath(product.images?.[0]);

        return `
          <div class="product-card" data-id="${product.product_id || "N/A"}">
            <div class="product-image-wrapper">
              <img src="${imagePath}" alt="${
          product.name || "상품 이미지"
        }" class="product-image" />
              <div class="hover-icons">
                <i class="fa fa-heart wish-icon"></i>
                <i class="fa fa-shopping-cart cart-icon"></i>
              </div>
            </div>
            
            <div class="product-info">
              <span class="product-name">${
                product.name || "상품명 없음"
              }</span>          
              <span class="price">${
                product.price
                  ? product.price.toLocaleString() + " 원"
                  : "가격 정보 없음"
              }</span>
              ${
                product.tags?.includes("BEST")
                  ? `<span class="bestTag">BEST</span>`
                  : ""
              }
            </div>
          </div>
        `;
      })
    );

    return renderedProducts.join("");
  }

  // 이벤트 추가
  addEventListeners() {
    const bestProductElements = this.querySelectorAll(".product-card");
    bestProductElements.forEach((productElement) => {
      productElement.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        if (productId) {
          window.location.href = `product.html?product_id=${productId}`;
        }
      });
    });
  }
}

customElements.define("best-product-component", BestProductComponent);

export default BestProductComponent;

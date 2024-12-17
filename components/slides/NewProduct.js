import { fetchProducts } from "../../api/api.js"; // JSON 데이터를 가져오는 API 함수
import { formatImagePath } from "../utils/image.js";

class NewProductComponent extends HTMLElement {
  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    try {
      // 데이터 가져오기
      const allProducts = await fetchProducts();

      // 안전하게 `tags` 배열 확인 후 "NEW" 태그 필터링
      this.products = allProducts
        .filter(
          (product) =>
            Array.isArray(product.tags) && product.tags.includes("NEW")
        )
        .slice(0, 10); // 최신 10개 상품만 가져오기

      this.render();
      this.addEventListeners();
    } catch (error) {
      console.error("Failed to load new products:", error);
      this.innerHTML = `<p>신상품 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }

  render() {
    this.innerHTML = `
      <div class="new-product-container">
        <!-- 제목 -->
        <div class="swiper-text">
          <span>신상품</span>
          <span>황금단에서 선보이는 신상품</span>
        </div>
        
        <!-- 상품 리스트 -->
        <div class="Products">
          ${this.renderProducts()}
        </div>
      </div>
    `;
  }

  // 신상품 리스트 렌더링
  renderProducts() {
    if (this.products.length === 0) {
      return `<p>등록된 신상품이 없습니다.</p>`;
    }

    return this.products
      .map(
        (product) => `
          <div class="product-card" data-id="${product.id || "N/A"}">
            <div class="product-image-wrapper">
              <img src="${formatImagePath(product.images?.[0])}" alt="${
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
                product.tags?.includes("NEW")
                  ? `<span class="newTag">NEW</span>`
                  : ""
              }
            </div>
          </div>
        `
      )
      .join("");
  }

  // 이벤트 추가
  addEventListeners() {
    const productElements = this.querySelectorAll(".product-card");
    productElements.forEach((productElement) => {
      productElement.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        if (productId) {
          window.location.href = `product.html?id=${productId}`;
        }
      });
    });
  }
}

customElements.define("new-product-component", NewProductComponent);

export default NewProductComponent;

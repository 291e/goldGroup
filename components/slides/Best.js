import { fetchProducts } from "../../api/api.js"; // JSON 데이터를 가져오는 API 함수

class BestProductComponent extends HTMLElement {
  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    try {
      // 데이터 가져오기
      const allProducts = await fetchProducts();

      // `tag` 배열에 `BEST`가 포함된 상품만 필터링
      this.products = Object.values(allProducts).filter((product) =>
        product.tag.includes("BEST")
      );

      this.render();
      this.addEventListeners();
    } catch (error) {
      console.error("Failed to load best products:", error);
      this.innerHTML = `<p>베스트셀러 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }

  render() {
    this.innerHTML = `
      <div class="best-product-container">
        <!-- 제목 -->
        <div class="swiper-text">
          <span>베스트셀러</span>
          <span>황금단에서 인기있는 상품</span>
        </div>
        
        <!-- 상품 리스트 -->
        <div class="Products">
          ${this.renderProducts()}
        </div>
      </div>
    `;
  }

  // 베스트셀러 리스트 렌더링
  renderProducts() {
    if (this.products.length === 0) {
      return `<p>등록된 베스트셀러 상품이 없습니다.</p>`;
    }

    return this.products
      .map(
        (product) => `
          <div class="product-card" data-id="${product.id}">
            <div class="product-image-wrapper">
            <img src="${product.images[0]}" alt="${
          product.name
        }" class="product-image" />
              <div class="hover-icons">
                <i class="fa fa-heart wish-icon"></i>
                <i class="fa fa-shopping-cart cart-icon"></i>
              </div>
            </div>
            
            <div class="product-info">
              <span>${product.name}</span>          
              <span class="price">${product.price.toLocaleString()} 원</span>
              <span class="bestTag">${
                product.tag.find((tag) => tag === "BEST") || ""
              }</span>
            </div>
          </div>
        `
      )
      .join("");
  }

  // 이벤트 추가
  addEventListeners() {
    const bestProductElements = this.querySelectorAll(".product-card");
    bestProductElements.forEach((productElement) => {
      productElement.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        if (productId) {
          window.location.href = `product.html?id=${productId}`;
        }
      });
    });
  }
}

customElements.define("best-product-component", BestProductComponent);

export default BestProductComponent;

import { fetchProducts } from "../api/api.js"; // JSON 데이터를 가져오는 API 함수

class HanbokComponent extends HTMLElement {
  constructor() {
    super();
    this.products = [];
    this.category = ""; // 카테고리 변수
    this.title = ""; // 제목 변수
  }

  async connectedCallback() {
    // 현재 카테고리 가져오기 (HTML 속성에서 추출)
    this.category = this.getAttribute("data-category") || "혼주한복";
    this.title = this.getAttribute("data-title") || `${this.category} 한복`;

    try {
      // 데이터 가져오기
      const allProducts = await fetchProducts();
      console.log("allProducts: ", allProducts);
      this.products = Object.values(allProducts).filter(
        (product) => product.category === this.category
      );

      this.render();
      this.addEventListeners();
    } catch (error) {
      console.error("Failed to load products:", error);
      this.innerHTML = `<p>상품 데이터를 불러오는 데 실패했습니다.</p>`;
    }
  }

  render() {
    this.innerHTML = `
        <div class="hanbok-container">
          <!-- 제목 -->
          <div class="hanbok-header">
            <h1 class="hanbok-title">${this.title}</h1>
            <div class="hanbok-controls">
              <span class="product-count">등록 제품: ${
                this.products.length
              }개</span>
              <div class="filter">
                <select id="filter-select">
                  <option value="new">신상품</option>
                  <option value="name">상품명</option>
                  <option value="low-price">낮은 가격</option>
                  <option value="high-price">높은 가격</option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- 분리선 -->
          <hr class="divider" />
  
          <!-- 상품 리스트 -->
          <div class="product-grid">
            ${this.renderProducts()}
          </div>
  
          <!-- 페이지네이션 -->
          <div class="pagination-hanbok">
            <button class="pagination-btn" data-page="first"><<</button>
            <button class="pagination-btn" data-page="prev"><</button>
            <span class="page-numbers">
                <!-- 페이지 번호 -->
            </span>
            <button class="pagination-btn" data-page="next">></button>
            <button class="pagination-btn" data-page="last">>></button>
          </div>
        </div>
      `;
  }

  // 상품 그리드 렌더링
  renderProducts() {
    if (this.products.length === 0) {
      return `<p>등록된 제품이 없습니다.</p>`;
    }

    return this.products
      .map(
        (product) => `
          <div class="product-card">
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
              <span class="product-name">${product.name}</span>
              <span class="product-price">${product.price.toLocaleString()} 원</span>
            </div>
          </div>
        `
      )
      .join("");
  }

  // 이벤트 추가
  addEventListeners() {
    const filterSelect = this.querySelector("#filter-select");
    filterSelect.addEventListener("change", (e) => {
      const filterValue = e.target.value;
      this.applyFilter(filterValue);
    });

    const productCards = this.querySelectorAll(".product-card");
    productCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const productId = this.products[index].id;
        window.location.href = `product.html?id=${productId}`;
      });
    });
  }

  // 필터 적용
  applyFilter(filter) {
    switch (filter) {
      case "new":
        this.products.sort((a, b) => b.id - a.id); // 신상품 순
        break;
      case "name":
        this.products.sort((a, b) => a.name.localeCompare(b.name)); // 이름 순
        break;
      case "low-price":
        this.products.sort((a, b) => a.price - b.price); // 낮은 가격 순
        break;
      case "high-price":
        this.products.sort((a, b) => b.price - a.price); // 높은 가격 순
        break;
    }
    this.render();
    this.addEventListeners(); // 필터 변경 후 다시 이벤트 추가
  }
}

customElements.define("hanbok-component", HanbokComponent);

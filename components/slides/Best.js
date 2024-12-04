class BestProductComponent extends HTMLElement {
  connectedCallback() {
    // 신상품 데이터
    const products = [
      {
        image: "public/product/product01.jpg",
        name: "New Product 1",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 2",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 3",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 4",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 5",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 6",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 7",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 8",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 9",
        price: "1,000,000원",
        tag: "BEST",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 10",
        price: "1,000,000원",
        tag: "BEST",
      },
    ];

    // HTML 구조 생성
    this.innerHTML = `
            <div class="swiper-text">
            <span>베스트셀러</span>
            <span>황금단에서 인기있는 상품</span>
            </div>
        <div class="newProducts">
  
          ${products
            .map(
              (product) => `
              <div class="newProduct">
                <img src="${product.image}" alt="${product.name}" class="newProduct-image">
                <div class="bestProduct-info">
                  <div>
                    <span>${product.name}</span>
                    <span>${product.tag}</span>
                  </div>
                  <span>${product.price}</span>
                </div>
                <div class="newProduct-wishlistIcon">
                  <i class="fa fa-heart"></i>
                  
                </div>
              </div>
              
            `
            )

            .join("")}
        
            </div>
      `;
  }
}

customElements.define("best-product-component", BestProductComponent);

export default BestProductComponent;

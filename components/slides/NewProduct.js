class NewProductComponent extends HTMLElement {
  connectedCallback() {
    // 신상품 데이터
    const products = [
      {
        image: "public/product/product01.jpg",
        name: "New Product 1",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 2",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 3",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 4",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 5",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 6",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 7",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 8",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product01.jpg",
        name: "New Product 9",
        price: "1,000,000원",
        tag: "new",
      },
      {
        image: "public/product/product02.jpg",
        name: "New Product 10",
        price: "1,000,000원",
        tag: "new",
      },
    ];

    // HTML 구조 생성
    this.innerHTML = `
            <div class="swiper-text">
            <span>신상품</span>
            <span>황금단에서 선보이는 신상품</span>
            </div>
        <div class="newProducts">
  
          ${products
            .map(
              (product) => `
              <div class="newProduct">
                <img src="${product.image}" alt="${product.name}" class="newProduct-image">
                <div class="newProduct-info">
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

customElements.define("new-product-component", NewProductComponent);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible"); // 컴포넌트가 보이면 애니메이션 클래스 추가
      } else {
        entry.target.classList.remove("fade-in-visible"); // 보이지 않으면 클래스 제거
      }
    });
  },
  {
    threshold: 0.1, // 10%만 보이면 애니메이션 실행
  }
);

document
  .querySelectorAll("new-product-component")
  .forEach((component) => observer.observe(component));
document
  .querySelectorAll("best-product-component")
  .forEach((component) => observer.observe(component));
document
  .querySelectorAll("review-slider-component")
  .forEach((component) => observer.observe(component));
document
  .querySelectorAll("longBanner-text")
  .forEach((component) => observer.observe(component));

export default NewProductComponent;

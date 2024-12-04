// 샘플 상품 데이터
const productData = {
  1: {
    id: "1",
    name: "노랑날개치마+화이트블링당의",
    price: 1000000,
    images: [
      "public/product/product01.jpg",
      "public/product/product02.jpg",
      "public/product/product03.jpg",
    ],
    description: "이 상품은 고급스러운 디자인의 노랑날개치마입니다.",
  },
  2: {
    id: "2",
    name: "핑크드레스+보석당의",
    price: 1200000,
    images: [
      "public/product/product02.jpg",
      "public/product/product04.jpg",
      "public/product/product05.jpg",
    ],
    description: "화려한 핑크드레스와 보석당의의 조화가 돋보이는 상품입니다.",
  },
  3: {
    id: "3",
    name: "파란드레스+보석당의",
    price: 1000000,
    images: [
      "public/product/product03.jpg",
      "public/product/product04.jpg",
      "public/product/product05.jpg",
    ],
    description: "화려한 파란드레스와 보석당의의 조화가 돋보이는 상품입니다.",
  },
};

// URL에서 상품 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 상품 렌더링 컨테이너
const productPage = document.getElementById("product-page");

// 상품 데이터 렌더링 함수
function renderProduct(product) {
  productPage.innerHTML = `
    <div id="product-${product.id}" class="product-container">
      <!-- 이미지 섹션 -->
      <div class="product-image-section">
        <div class="product-image-wrapper">
          <img src="${product.images[0]}" alt="${
    product.name
  }" class="product-image">
        </div>
        <div class="thumbnail-wrapper">
          ${product.images
            .map(
              (img, index) =>
                `<img src="${img}" alt="Thumbnail ${
                  index + 1
                }" class="thumbnail ${index === 0 ? "active" : ""}">`
            )
            .join("")}
        </div>
      </div>

      <!-- 상품 정보 섹션 -->
      <div class="product-info-section">
        <div class="product-col">
          <span>상품명</span>
          <span>${product.name}</span>
        </div>
        <div class="product-col">
          <span>판매가</span>
          <span>${product.price.toLocaleString()}원</span>
        </div>
        <div class="line-bar-product"></div>
        <div class="min-total">
          <span>(최소주문수량 1개 이상)</span>
          <span>수량을 선택해주세요.</span>
        </div>
        <div class="line-bar-product"></div>
        <div class="product-quantity">
          <label for="quantity">수량</label>
          <input type="number" id="quantity" name="quantity" value="1" min="1">
          <span class="total">${product.price.toLocaleString()}원</span>
        </div>
        <div class="line-bar-product"></div>
        <span class="product-total">총 상품금액(수량): ${product.price.toLocaleString()}원 (1개)</span>
        <div class="product-buttons">
          <button class="buy-now">Buy Now</button>
          <button class="cart">Cart</button>
          <button class="wish">Wish</button>
        </div>

        <!-- 라벨 업로드 및 결과물 -->
        <div class="label-result-section">
          <div class="upload-flex">
            <div class="label-upload">
              <label for="face-input" class="upload-label">
                <div class="upload-ui">
                  <div></div>
                </div>
              </label>
              <input type="file" id="face-input" accept="image/*">
              <button id="generate-button" class="generate-btn">생성하기</button>
            </div>
            <div class="result-image">
              <img id="generated-image" src="" alt="Generated Result" style="display: none; width: 300px;">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 상품 데이터 렌더링 및 이벤트 설정
function initializeProductPage(product) {
  renderProduct(product);

  // 썸네일 클릭 이벤트
  const thumbnails = productPage.querySelectorAll(".thumbnail");
  const mainImage = productPage.querySelector(".product-image");
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      mainImage.src = product.images[index];
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnail.classList.add("active");
    });
  });

  // 수량 변경 이벤트
  const quantityInput = productPage.querySelector("#quantity");
  const totalPrice = productPage.querySelector(".product-total");
  const totalNum = productPage.querySelector(".total");
  quantityInput.addEventListener("input", (e) => {
    const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    e.target.value = quantity;
    totalPrice.textContent = `총 상품금액(수량): ${(
      product.price * quantity
    ).toLocaleString()}원 (${quantity}개)`;
    totalNum.textContent = `${(product.price * quantity).toLocaleString()}원`;
  });

  // 라벨 업로드 및 결과물 처리
  const faceInput = productPage.querySelector("#face-input");
  const generateButton = productPage.querySelector("#generate-button");
  const resultImage = productPage.querySelector("#generated-image");
  const uploadUi = productPage.querySelector(".upload-ui");

  // 파일 업로드 및 미리보기
  faceInput.addEventListener("change", function () {
    const file = faceInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadUi.style.backgroundImage = `url(${e.target.result})`;
        uploadUi.style.border = "none";
      };
      reader.readAsDataURL(file);
    }
  });

  // '생성하기' 버튼 클릭 이벤트
  generateButton.addEventListener("click", async function () {
    const formData = new FormData();
    const file = faceInput.files[0];

    if (!file) {
      alert("얼굴 사진을 업로드해주세요.");
      return;
    }

    formData.append("face_file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/run_workflow/face_swap",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("서버 응답 실패");

      const result = await response.json();

      if (result.status === "success") {
        resultImage.src = `data:image/png;base64,${result.image_base64}`;
        resultImage.style.display = "block";
      } else {
        alert("이미지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  });
}

// 상품 ID 확인 및 초기화
if (productData[productId]) {
  initializeProductPage(productData[productId]);
} else {
  productPage.innerHTML = `<h1>404 - 상품을 찾을 수 없습니다.</h1>`;
}

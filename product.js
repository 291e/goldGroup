import { fetchProductById } from "./api/api.js"; // JSON 데이터를 가져오는 API 함수

// URL에서 상품 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 상품 렌더링 컨테이너
const productPage = document.getElementById("product-page");

// 상품 데이터 렌더링 함수
function renderProduct(product) {
  productPage.innerHTML = `
  <div class="product-main">
    <div id="product-${product.id || "unknown"}" class="product-container">
      <!-- 이미지 섹션 -->
      <div class="product-image-section">
        <div class="product-image-wrapper">
          <img src="${
            product.images?.[0] || "./public/product/product01.jpg"
          }" alt="${product.name || "상품 이미지"}" class="product-image">
        </div>
        <div class="thumbnail-wrapper">
        ${(Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : ["./public/product/product01.jpg"]
        )
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
          <span>${product.name || "상품명 없음"}</span>
        </div>
        <div class="product-col">
          <span>판매가</span>
          <span>${
            product.price
              ? product.price.toLocaleString() + "원"
              : "가격 정보 없음"
          }</span>
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
          <span class="total">${
            product.price ? product.price.toLocaleString() + "원" : "N/A"
          }</span>
        </div>
        <div class="line-bar-product"></div>
        <span class="product-total">총 상품금액(수량): ${
          product.price ? product.price.toLocaleString() + "원" : "N/A"
        } (1개)</span>
        <div class="product-buttons">
          <button class="buy-now">Buy Now</button>
          <button class="cart">Cart</button>
          <button class="wish">Wish</button>
        </div>
      </div>
    </div>

    <!-- 스크롤 섹션 -->
    <div class="product-scroll">
      <div id="detail-section" class="content-section" data-section="Detail">
        <div class="detail-image">
          ${
            Array.isArray(product.detailImages) &&
            product.detailImages.length > 0
              ? product.detailImages
                  .map(
                    (img) =>
                      `<img src="${img}" alt="디테일 이미지" class="detail-img">`
                  )
                  .join("")
              : `<p>디테일 이미지가 없습니다.</p>`
          }
        </div>
      </div>

      <div id="info-section" class="content-section" data-section="Info">
        <div class="info-container">
          <div class="info-column">
            <h3>[ 상품결제정보 ]</h3>
            <p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다...</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

async function initializeProductPage() {
  try {
    // 특정 상품 ID로 데이터 가져오기
    const product = await fetchProductById(productId);

    if (product) {
      renderProduct(product); // 상품 렌더링

      // 초기화 함수 호출
      addScrollMenu();

      // 이벤트 리스너 추가
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
        totalNum.textContent = `${(
          product.price * quantity
        ).toLocaleString()}원`;
      });

      // 라벨 업로드 및 결과물 처리
      const faceInput = productPage.querySelector("#face-input");
      const generateButton = productPage.querySelector("#generate-button");
      const resultImage = productPage.querySelector("#generated-image");

      // 파일 업로드 및 미리보기
      faceInput.addEventListener("change", function () {
        const file = faceInput.files[0];
        const uploadUi = document.querySelector(".upload-ui");
        const uploadIcon = document.querySelector("#upload-icon");

        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            uploadUi.style.backgroundImage = `url(${e.target.result})`;
            uploadUi.style.border = "none";
          };
          reader.readAsDataURL(file);
        }

        // MutationObserver를 사용하여 스타일 변경 감지
        const observer = new MutationObserver(() => {
          if (uploadUi.style.backgroundImage !== "") {
            if (uploadIcon) {
              uploadIcon.style.display = "none"; // 아이콘 숨기기
            }
            observer.disconnect(); // 더 이상 관찰하지 않음
          }
        });

        observer.observe(uploadUi, {
          attributes: true,
          attributeFilter: ["style"],
        });
      });

      // '생성하기' 버튼 클릭 이벤트
      generateButton.addEventListener("click", async function () {
        const faceFile = faceInput.files[0];
        const targetImages = document.querySelectorAll("#detail-section img");
        const mainImage = document.querySelector(".product-image");
        const uploadIcon = document.querySelector("#upload-icon");

        if (!faceFile) {
          alert("얼굴 사진을 업로드해주세요.");
          return;
        }

        if (uploadIcon) {
          uploadIcon.style.display = "none";
        }

        try {
          const allImages = [mainImage, ...targetImages];

          for (const [index, img] of allImages.entries()) {
            const formData = new FormData();
            formData.append("face_file", faceFile);

            const response = await fetch(img.src);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch target file: ${response.statusText}`
              );
            }
            const blob = await response.blob();
            const targetFile = new File([blob], `target_image_${index}.jpg`, {
              type: blob.type,
            });
            formData.append("target_file", targetFile);

            const serverResponse = await fetch(
              "http://110.10.182.81:5001/run_workflow/face_swap",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!serverResponse.ok) {
              const errorText = await serverResponse.text();
              console.error("Response Error Text:", errorText);
              throw new Error(
                `Error: ${serverResponse.status} ${serverResponse.statusText}`
              );
            }

            const responseData = await serverResponse.json();
            if (responseData.image_base64) {
              const base64Image = responseData.image_base64;
              img.src = `data:image/png;base64,${base64Image}`;
              if (index === 0) {
                resultImage.src = `data:image/png;base64,${base64Image}`;
                resultImage.style.display = "block";

                resultImage.onload = function () {
                  const resultImageContainer =
                    document.querySelector(".result-image");
                  resultImageContainer.style.border = "none";
                };

                resultImage.addEventListener("click", () => {
                  showModal(base64Image);
                });
              }
            } else {
              console.error("Server Error: No image_base64 in response");
            }
          }

          alert("모든 이미지가 성공적으로 합성되었습니다.");
        } catch (error) {
          console.error("Error:", error.message);
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      });

      function showModal(base64Image) {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        `;

        const modalContent = document.createElement("div");
        modalContent.style.cssText = `
          width:50%;
          height:50%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        `;

        const image = document.createElement("img");
        image.src = `data:image/png;base64,${base64Image}`;
        image.style.cssText = `
          max-width: auto;
          max-height: 100%;
          border-radius: 8px;
        `;

        const downloadButton = document.createElement("a");
        downloadButton.href = image.src;
        downloadButton.download = "generated_image.png";
        downloadButton.textContent = "이미지 다운로드";
        downloadButton.style.cssText = `
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #ff9800;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        `;

        modalContent.appendChild(image);
        modalContent.appendChild(downloadButton);
        modal.appendChild(modalContent);

        modal.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
      }
    } else {
      productPage.innerHTML = `<h1>404 - 상품을 찾을 수 없습니다.</h1>`;
    }
  } catch (error) {
    console.error("Failed to load product:", error);
    productPage.innerHTML = `<p>상품 데이터를 불러오는 데 실패했습니다.</p>`;
  }
}

// 초기화 함수 호출
initializeProductPage();

// 스크롤 메뉴 버튼 생성 및 삽입
function addScrollMenu() {
  const sections = document.querySelectorAll(".content-section");

  sections.forEach((section) => {
    const scrollMenu = document.createElement("div");
    scrollMenu.className = "scroll-menu";
    scrollMenu.innerHTML = ` <button data-scroll-target="detail-section">Detail</button>
      <button data-scroll-target="info-section">Info</button>
      <button data-scroll-target="review-section">Review</button>
      <button data-scroll-target="qa-section">Q&A</button> `;
    section.before(scrollMenu);
  });

  // 메뉴 클릭 이벤트
  document.querySelectorAll(".scroll-menu button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = document.getElementById(e.target.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

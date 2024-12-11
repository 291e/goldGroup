import { fetchProducts } from "./api/api.js"; // JSON 데이터를 가져오는 API 함수

// 샘플 상품 데이터
const productData = {
  1: {
    id: "1",
    name: "초록날개치마+화이트블링당의",
    price: 1000000,
    images: ["public/product/product01.jpg"],
    description: "이 상품은 고급스러운 디자인의 초록날개치마입니다.",
    detailImages: [
      "public/product/product01.jpg",
      "public/detail/detail01.jpg",
      "public/detail/detail01-2.jpg",
    ],
  },
  2: {
    id: "2",
    name: "파란드레스+보석당의",
    price: 1200000,
    images: ["public/product/product02.jpg"],
    description: "화려한 파란드레스와 보석당의의 조화가 돋보이는 상품입니다.",
    detailImages: [
      "public/product/product02.jpg",
      "public/detail/detail02.jpg",
    ],
  },
  3: {
    id: "3",
    name: "[커플] 프로포즈",
    price: 1000000,
    images: ["public/product/product03.jpg"],
    description: "",
    detailImages: [
      "public/product/product03.jpg",
      "public/detail/detail03.jpg",
    ],
  },
  4: {
    id: "4",
    name: "[커플] 홀다올",
    price: 1000000,
    images: ["public/product/product04.jpg"],
    description: "",
    detailImages: [
      "public/product/product04.jpg",
      "public/detail/detail04.jpg",
    ],
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
  <div class="product-main">
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
                <i id="upload-icon" class="fa-solid fa-plus"></i>
                </div>
              </label>
              <input type="file" id="face-input" accept="image/*">
              <div class="generate">
                <button id="generate-button" class="generate-btn">AI로 한복 입어보기</button>
                <div class="meta-style">
                <a href="https://www.metabank3d.com/" target="_blink">
                  <img src="public/metaStyle.png" alt="메타스타일링">
                </a>
                </div>
              </div>
            </div>
            <div class="result-image">
              <img id="generated-image" src="" alt="Generated Result" style="display: none; width: 300px; height: auto;">
            </div>
          </div>
        </div>
        
      </div>
      
    </div>

<!-- 스크롤 섹션 -->
<div class="product-scroll">
  <div id="detail-section" class="content-section" data-section="Detail">
    <div class="detail-image">
         ${product.detailImages
           .map(
             (img) =>
               `<img src="${img}" alt="디테일 이미지" class="detail-img">`
           )
           .join("")}
    </div>
  </div>

  <div id="info-section" class="content-section" data-section="Info">
    <div class="info-container">
    <!-- 왼쪽 내용 -->
    <div class="info-column">
      <h3>[ 상품결제정보 ]</h3>
      <p>고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.</p>
      <p>무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.</p>
      <p>주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.</p>

      <h3>[ 교환 및 반품정보 ]</h3>
      <ul>
        <li>교환 및 반품 의사는 반드시 고객센터 또는 Q&A 게시판을 통해 요청해주셔야 합니다.</li>
        <li>예약 주문 및 주문 제작 제품은 반품 및 교환 불가합니다.</li>
        <li>주문제작 제품은 제작 진행 후 교환, 환불이 불가합니다. (소비자 요청에 의해 해외 발주가 진행된 제품 또는 방송 판매 제품 포함)</li>
        <li>고객이 직접 조립 및 시공을 진행하는 제품에 대해서는 조립 후 교환 및 반품이 불가합니다.</li>
        <li>고객의 사용 또는 고객의 책임 있는 사유로 상품의 가치가 하락 또는 훼손된 경우 교환 및 반품이 불가합니다.</li>
      </ul>


    </div>

    <!-- 가운데 선 -->
    <div class="divider"></div>

    <!-- 오른쪽 내용 -->
    <div class="info-column">

    <h3>[ 배송정보 ]</h3>
      <p>배송 방법: 택배</p>
      <p>배송 지역: 전국지역</p>
      <p>배송 비용: 무료</p>
      <p>배송 기간: 2일 ~ 7일</p>
      <p>배송 안내: 전 제품 무료 배송 및 설치 (도서, 산간, 해외 별도 요금)</p>
      <ul>
        <li>전자상거래법에 의거하여 교환 및 반품 요청은 수령일로부터 7일 이내입니다.</li>
        <li>제품의 자체적인 하자가 있는 경우 개봉 당시의 사진이 반드시 있어야 교환 및 반품 상담이 가능합니다.</li>
        <li>고객의 단순 변심이나 실수로 인한 반품 또는 교환의 경우 왕복 배송비는 고객이 부담합니다.</li>
        <li>교환/반품 시에는 제품에 따라 왕복배송비 (제품별 금액이 상이할 수 있으므로 고객센터 문의)를 부담하셔야 합니다.</li>
        <li>교환 및 반품은 택배사를 통해 수거하며, 제품/택/패키지 박스 등 보내드린 구성품 그대로 온전한 상태로 반송해주셔야 합니다.</li>
        <li>제품/택/패키지 박스 등에 훼손이 있어 교환 및 반품이 불가할 경우 재반송 처리됩니다.</li>
      </ul>

      <h3>[ 서비스문의 ]</h3>
      <p>문의는 010-4065-1004 로 연락주세요.</p>

    </div>
  </div>
  </div>

  <div id="review-section" class="content-section" data-section="Review">
    <h2>Review</h2>
    <p>리뷰 내용이 여기에 들어갑니다...</p>
  </div>

  <div id="qa-section" class="content-section" data-section="Q&A">
    <h2>Q&A</h2>
    <p>질문과 답변 내용이 여기에 들어갑니다...</p>
  </div>
</div>


  `;
}

async function initializeProductPage() {
  try {
    const allProducts = await fetchProducts(); // API에서 데이터 가져오기
    const product = allProducts[productId]; // 상품 ID로 해당 상품 데이터 찾기

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

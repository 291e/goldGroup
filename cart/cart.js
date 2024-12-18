import {
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../api/api.js";

// HTML 요소 선택
const cartContainer = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");
const shippingFeeElement = document.getElementById("shipping-fee");
const finalPriceElement = document.getElementById("final-price");

// 장바구니 데이터 로드
async function loadCart() {
  try {
    const cartItems = await fetchCart();

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `<p>장바구니가 비어있습니다.</p>`;
      return;
    }

    cartContainer.innerHTML = cartItems
      .map((item) => renderCartItem(item))
      .join("");
    updateCartSummary(cartItems);
  } catch (error) {
    console.error("Error loading cart:", error.message);
  }
}

// 장바구니 항목 렌더링
function renderCartItem(item) {
  return `
      <div class="cart-item" data-cart-id="${item.cart_id}">
        <img src="${item.images[0]}" alt="${item.name}" />
        <div class="details">
          <h3>${item.name}</h3>
          <p>₩${item.price.toLocaleString()}</p>
          <div class="quantity-controls">
            <button data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button data-action="increase">+</button>
          </div>
          <button class="remove" data-action="remove">삭제</button>
        </div>
      </div>
    `;
}

// 장바구니 요약 업데이트
function updateCartSummary(cartItems) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = totalPrice > 50000 ? 0 : 3000;
  const finalPrice = totalPrice + shippingFee;

  totalPriceElement.textContent = `₩${totalPrice.toLocaleString()}`;
  shippingFeeElement.textContent =
    shippingFee === 0 ? "무료배송" : `₩${shippingFee.toLocaleString()}`;
  finalPriceElement.textContent = `₩${finalPrice.toLocaleString()}`;
}

// 이벤트 핸들러 추가
cartContainer.addEventListener("click", async (e) => {
  const action = e.target.dataset.action;
  const cartItemElement = e.target.closest(".cart-item");
  const cartId = cartItemElement?.dataset.cartId;

  if (action === "increase" || action === "decrease") {
    const quantityElement = cartItemElement.querySelector("span");
    let quantity = parseInt(quantityElement.textContent, 10);
    quantity += action === "increase" ? 1 : -1;
    if (quantity > 0) {
      quantityElement.textContent = quantity;
      await updateCartItem(cartId, quantity);
    }
  }

  if (action === "remove") {
    await deleteCartItem(cartId);
    loadCart();
  }
});

// 장바구니 비우기
document.getElementById("clear-cart").addEventListener("click", async () => {
  await clearCart();
  loadCart();
});

// 초기 데이터 로드
loadCart();

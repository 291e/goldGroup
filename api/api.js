const PRODUCTS_BASE_URL =
  "https://1249-218-150-126-143.ngrok-free.app/products"; // 상품 관련 API URL
const CART_BASE_URL = "https://1249-218-150-126-143.ngrok-free.app/cart"; // 장바구니 관련 API URL

// 모든 상품 가져오기
export async function fetchProducts() {
  try {
    const response = await fetch(PRODUCTS_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

// 특정 상품 가져오기 (ID 기반)
export async function fetchProductById(product_id) {
  try {
    const response = await fetch(`${PRODUCTS_BASE_URL}/${product_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with ID ${product_id}: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching product with ID ${product_id}:`,
      error.message
    );
    return null;
  }
}

// 새로운 상품 추가
export async function createProduct(productData) {
  try {
    const response = await fetch(`${PRODUCTS_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status}`);
    }

    const createdProduct = await response.json();
    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error.message);
    return null;
  }
}

// 상품 업데이트
export async function updateProduct(product_id, productData) {
  try {
    const response = await fetch(`${PRODUCTS_BASE_URL}/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update product with ID ${product_id}: ${response.status}`
      );
    }

    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error(
      `Error updating product with ID ${product_id}:`,
      error.message
    );
    return null;
  }
}

// 상품 삭제
export async function deleteProduct(product_id) {
  try {
    const response = await fetch(`${PRODUCTS_BASE_URL}/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete product with ID ${product_id}: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error(
      `Error deleting product with ID ${product_id}:`,
      error.message
    );
    return false;
  }
}

// 검색(Search) 상품 가져오기
export async function searchProducts(query) {
  try {
    const response = await fetch(
      `${PRODUCTS_BASE_URL}/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error searching products:", error.message);
    return [];
  }
}

// 필터(Filter) 상품 가져오기
export async function filterProducts(filters) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${PRODUCTS_BASE_URL}/filter?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to filter products: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error filtering products:", error.message);
    return [];
  }
}

// 장바구니 데이터 가져오기
export async function fetchCart() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(CART_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // 401 또는 403 응답 처리
      if (response.status === 401 || response.status === 403) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        return [];
      }
      throw new Error(`Failed to fetch cart items: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    alert("장바구니 조회 중 오류가 발생했습니다.");
    return [];
  }
}

// 장바구니에 상품 추가
export async function addToCart(product_Id, quantity) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(CART_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: product_Id, quantity }),
    });

    if (!response.ok) {
      // 401 또는 403 응답 처리
      if (response.status === 401 || response.status === 403) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        return null;
      }
      throw new Error(`Failed to add item to cart: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    alert("장바구니 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
    return null;
  }
}

// 장바구니 항목 수량 업데이트
export async function updateCartItem(cart_Id, quantity) {
  try {
    const response = await fetch(`${CART_BASE_URL}/${cart_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating cart item:", error.message);
    throw error;
  }
}

// 장바구니 항목 삭제
export async function deleteCartItem(cart_Id) {
  try {
    const response = await fetch(`${CART_BASE_URL}/${cart_Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete cart item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting cart item:", error.message);
    throw error;
  }
}

// 장바구니 비우기
export async function clearCart() {
  try {
    const response = await fetch(`${CART_BASE_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
      },
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    throw error;
  }
}

const BASE_URL = "https://326b-218-150-126-143.ngrok-free.app/products"; // API 기본 URL

// 모든 상품 가져오기
export async function fetchProducts() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

// 특정 상품 가져오기 (ID 기반)
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with ID ${id}: ${response.status}`
      );
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    return null;
  }
}

// 새로운 상품 추가
export async function createProduct(productData) {
  try {
    const response = await fetch(BASE_URL, {
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
export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update product with ID ${id}: ${response.status}`
      );
    }

    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error.message);
    return null;
  }
}

// 상품 삭제
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete product with ID ${id}: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error.message);
    return false;
  }
}

// 검색(Search) 상품 가져오기
export async function searchProducts(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
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
    const response = await fetch(`${BASE_URL}/filter?${queryString}`, {
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

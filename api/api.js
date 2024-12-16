const BASE_URL = "https://326b-218-150-126-143.ngrok-free.app/products"; // API 기본 URL

// 모든 상품 가져오기
export async function fetchProducts() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // JSON 데이터 요청
        "ngrok-skip-browser-warning": "69420", // ngrok 브라우저 경고 우회
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const products = await response.json(); // JSON 데이터 파싱
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return []; // 오류 발생 시 빈 배열 반환
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

    const product = await response.json(); // JSON 데이터 파싱
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    return null; // 오류 발생 시 null 반환
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
      body: JSON.stringify(productData), // JSON 형식으로 변환
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

    return true; // 삭제 성공 시 true 반환
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error.message);
    return false;
  }
}

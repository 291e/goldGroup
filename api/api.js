export async function fetchProducts() {
  try {
    const response = await fetch("database/products.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // 호출하는 코드에서 에러를 처리할 수 있도록 다시 던집니다.
  }
}

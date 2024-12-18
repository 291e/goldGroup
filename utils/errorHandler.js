export function handleError(error) {
  console.error("Error:", error.message || error);
  alert("오류가 발생했습니다. 다시 시도해주세요.");
}

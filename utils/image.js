import { API_BASE_URL } from "../config/config";

// 기본 이미지 경로
const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

/**
 * 이미지 경로를 포맷하고 유효한 이미지를 반환
 * @param {string} imagePath 이미지 경로
 * @returns {Promise<string>} 유효한 이미지 URL 또는 기본 이미지 URL
 */
export async function formatImagePath(imagePath) {
  if (!imagePath) {
    return `${API_BASE_URL}${PLACEHOLDER_IMAGE}`;
  }

  // 이미지 경로를 정리
  const formattedPath = imagePath.startsWith("/images/")
    ? imagePath
    : `/images${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  const fullURL = `${API_BASE_URL}${formattedPath}`;

  try {
    // 이미지 fetch 요청
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      console.error(
        `Image fetch failed: ${fullURL} (status: ${response.status})`
      );
      return `${API_BASE_URL}${PLACEHOLDER_IMAGE}`;
    }

    // Blob URL 반환
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(`Error fetching image from ${fullURL}: ${error.message}`);
    return `${API_BASE_URL}${PLACEHOLDER_IMAGE}`;
  }
}

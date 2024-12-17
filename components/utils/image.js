export function formatImagePath(imagePath) {
  if (!imagePath) {
    return "placeholder.jpg";
  }
  const baseURL = "https://326b-218-150-126-143.ngrok-free.app";
  if (!imagePath.includes("/images/")) {
    imagePath = `/images${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  }
  return `${baseURL}${imagePath}`;
}

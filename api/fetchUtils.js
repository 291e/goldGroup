export async function apiFetch(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  };

  const token = localStorage.getItem("token");
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (response.status === 401 || response.status === 403) {
    alert("로그인이 필요합니다. 다시 로그인해주세요.");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

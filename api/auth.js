const AUTH_URL = "https://326b-218-150-126-143.ngrok-free.app/auth"; // Auth API 기본 URL

// 회원가입
export async function registerUser(userData) {
  try {
    const response = await fetch(
      "https://326b-218-150-126-143.ngrok-free.app/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return null;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(
      "https://326b-218-150-126-143.ngrok-free.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.status}`);
    }

    const result = await response.json();
    localStorage.setItem("token", result.token);
    return result;
  } catch (error) {
    console.error("Error logging in:", error.message);
    return null;
  }
}

// 전역 객체 등록
window.registerUser = registerUser;
window.loginUser = loginUser;

// 사용자 정보 가져오기 (토큰 필요)
export async function fetchUserProfile() {
  const token = localStorage.getItem("token"); // 저장된 토큰 가져오기

  try {
    const response = await fetch(`${AUTH_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 인증 토큰 추가
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
}

// 로그아웃 (토큰 삭제)
export function logoutUser() {
  localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
}

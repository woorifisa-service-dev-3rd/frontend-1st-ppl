// 쿠키 설정 함수
export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 쿠키 읽기 함수
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

// 쿠키 삭제 함수
// function deleteCookie(name) {
//     document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// }

// ID 값을 쿠키에 추가하는 함수
export function addIdToCookie(id) {
  const cookieName = "favorite";
  let favorite = getCookie(cookieName);
  favorite = favorite ? favorite.split(",") : [];

  if (!favorite.includes(id)) {
    favorite.push(id);
    setCookie(cookieName, favorite.join(","), 7); // 7일 동안 쿠키 유지
  }
}

// ID 값을 쿠키에서 삭제하는 함수
export function removeIdFromCookie(id) {
  const cookieName = "favorite";
  let favorite = getCookie(cookieName);
  favorite = favorite ? favorite.split(",") : [];

  const index = favorite.indexOf(id);
  if (index !== -1) {
    favorite.splice(index, 1);
    setCookie(cookieName, favorite.join(","), 7);
  }
}
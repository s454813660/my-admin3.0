import cookie from "cookie_js";
const Token = "token";
const Username = "username";

export function setToken(value) {
  cookie.set(Token, value);
}
export function getToken() {
  return cookie.get(Token);
}
export function removeToken() {
  cookie.remove(Token)
}

export function setUsername(value) {
  cookie.set(Username, value);
}
export function getUsername() {
  return cookie.get(Username);
}
export function removeUsername() {
  cookie.remove(Username)
}
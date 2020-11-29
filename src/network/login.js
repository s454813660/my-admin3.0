import { request } from "./request";

/**
 * 获取验证码
 */
export function getCaptcha(data) {
  return request({
    method: "post",
    url: "/getSms/",
    timeout: 15000,
    data
  })
}

/**
 * 登陆
 */
export function login(data) {
  return request({
    method: "post",
    url: "/login/",
    timeout: 15000,
    data
  })
}
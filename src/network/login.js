import { request } from "./request";

/**
 * 获取验证码
 */
export function getCaptcha(data) {
  return request({
    method: "post",
    url: "/getSms/",
    data
  })
}
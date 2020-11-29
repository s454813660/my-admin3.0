import { request } from "./request";
/**
 * 注册请求
 */
export function register(data) {
  return request({
    url: "/register/",
    method: "post",
    data
  })
}
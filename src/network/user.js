import { request } from "./request";
/**
 * 用户列表
 */
export function getUserList(params) {
  return request({
    url: params.url,
    method: params.method,
    data: params.data
  })
};
/**
 * 添加用户
 * @param {
 *  username：用户名（string）*
 *  truename：真实姓名（string）
 *  password：密码（string）* 
 *  phone：手机号（number）
 *  region：地区（json）
 *  status：禁启用状态（string）*
 *  role：角色类型（string）*
 * } data 
 * 带星号是必填项
 */
export function addUser(data) {
  return request({
    url: "/user/add/",
    method: "post",
    data
  })
};

/**
 * 用户禁启用
 * @param {
 *  id: 用户ID（number）
 *  status: 状态（string）1：禁用，2：启用
 * } data 
 */
export function statusActive(data) {
  return request({
    url: "/user/actives/",
    method: "POST",
    data
  })
}
/**
 * 删除用户
 * 数组形式
 * @param {
 *  id: [1,2]
 * } data 
 */
export function deleteUser(data) {
  return request({
    url: "/user/delete/",
    method: "post",
    data
  })
}
/**
 * 获取角色
 */
export function getRoles(data = {}) {
  return request({
    url: "/role/",
    method: "post",
    data
  })
}
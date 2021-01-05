import { request } from "./request";

/**
 * 添加信息
 */
export function addInfo(data) {
  return request({
    url: "/news/add/",
    method: "post",
    data
  })
};
/**
 * deleteInfo
 */
export function deleteInfo(data) {
  return request({
    url: "/news/deleteInfo/",
    method: "post",
    data
  })
}
/**
 * 修改信息
 */
export function editInfo(data) {
  return request({
    url: "/news/editInfo/",
    method: "post",
    data
  })
}
/**
 * 获取信息列表
 */
export function getList(data) {
  return request({
    url: "/news/getList/",
    method: "post",
    data
  })
}
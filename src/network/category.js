import { request } from "./request";
/**
 * 添加一级信息分类
 */
export function addFirstCategory(data) {
  return request({
    url: "/news/addFirstCategory/",
    method: "post",
    data
  })
};
/**
 * 添加子级信息分类
 */
export function addChildrenCategory(data) {
  return request({
    url: "/news/addChildrenCategory/",
    method: "post",
    data
  });
}

/**
 * 获取信息分类
 */
export function getCategoryAll() {
  return request({
    url: "/news/getCategoryAll/",
    method: "get"
  })
};


/**
 * 删除信息分类
 */
export function deleteCategory(data) {
  return request({
    url: "/news/deleteCategory/",
    method: "post",
    data
  })
}

/**
 * 修改分类信息
 */
export function putCategory(data) {
  return request({
    url: "/news/editCategory/",
    method: "post",
    data
  })
}


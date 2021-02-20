import { request } from "./request";
/**
 * 获取省、市、区
 * @province {
 *  type: "province",
 * }
 * @city {
 *   type: "province",
 *   province_code：10000 
 * }
 * @area {
 *   type: "city",
 *   city_code：10000
 * }
 * @street {
 *   type: "street",
 *   city_code：10000
 * }
 */
export function CityPicker(data) {
  return request({
    url: "/cityPicker/",
    method: "post",
    data
  })
}
import { getCategoryAll } from "@/network/category";
// async await捕获错误
import { awaitWrap } from "@/libs/utils/tools";
import { reactive } from "vue";
export function useCateData() {
  const categoryData = reactive({
    list: []
  });
  const GetCategoryAll = async () => {
    let [err, res] = await awaitWrap(getCategoryAll());
    // console.log(res);
    let resData = res.data.data;
    categoryData.list = resData;
    // console.log(categoryData.list);
  };
  return {
    categoryData,
    GetCategoryAll,
  }
}
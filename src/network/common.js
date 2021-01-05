import { getCategoryAll } from "@/network/category";
// async await捕获错误
import { awaitWrap } from "@/libs/utils/tools";
import { reactive } from "vue";
export function useCateData() {
  const category_data = reactive({
    list: []
  });
  const GetCategoryAll = async () => {
    let [err, res] = await awaitWrap(getCategoryAll());
    // console.log(res);
    let resData = res.data.data;
    category_data.list = resData;
    // console.log(category_data.list);
  };
  return {
    category_data,
    GetCategoryAll,
  }
}
import { getCategoryAll } from "@/network/category";
// async await捕获错误
import { awaitWrap } from "@/libs/utils/tools";
import { reactive } from "vue";
export function useCateData() {
  const categoryData = reactive({
    list: []
  });
  const GetCategoryAll = () => {
    return new Promise(async (resolve, reject) => {
      let [err, res] = await awaitWrap(getCategoryAll());
      // console.log(res);
      if(res) {
        let resData = res.data.data;
        categoryData.list = resData;
        resolve();
      }else{
        reject();
      }
    })
  };
  return {
    categoryData,
    GetCategoryAll,
  }
}
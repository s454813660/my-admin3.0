import { getList } from "./info";
import { awaitWrap } from "@/libs/utils/tools";
import { reactive } from "vue";

export function useInfoData() {
  const infoData = reactive({
    data: []
  });

  const GetList = async (params) => {
    getList(params).then(res => {
      console.log(res);
    })
  };

  return {
    infoData,
    GetList
  }
}
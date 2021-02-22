import { reactive } from "vue";
import { getUserList } from "@/network/user"
export function useUserData() {
  const userData = reactive({
    data: [],
    total: 0,
  });

  const GetUserList = (params) => {
    getUserList(params).then(res => {
      let resData = res.data.data
      userData.data = resData.data;
    })
  };

  return {
    userData,
    GetUserList
  }
}
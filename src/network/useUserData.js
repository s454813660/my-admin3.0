import { reactive } from "vue";
import { getUserList } from "@/network/user"
export function useUserData() {
  const userData = reactive({
    data: []
  });

  const GetUserList = (params) => {
    getUserList(params).then(res => {
      console.log(res);
    })
  };

  return {
    userData,
    GetUserList
  }
}
import { reactive } from "vue";
import { getUserList } from "@/network/user"
export function useUserData() {
  const userData = reactive({
    data: [],
    total: 0,
    loading: true
  });

  const GetUserList = (params) => {
    getUserList(params).then(res => {
      let resData = res.data
      if(resData.resCode === 0 ) {
        userData.data = resData.data.data;
        userData.loading = false;
      }
      
    })
  };

  return {
    userData,
    GetUserList
  }
}
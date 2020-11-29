import axios from "axios";
import { message } from "ant-design-vue";


const baseURL = process.env.NODE_ENV === "production"? "" : "devApi";
export function request(config) {
  console.log(process.env.NODE_ENV);
  console.log(process.env.VUE_APP_ABC);
  const instance = axios.create({
    baseURL
  });
  
  instance.interceptors.request.use(config => {

    return config;
  }, err => {

  });


  instance.interceptors.response.use(res => {
    let { data } = res;
    if(data.resCode !== 0) {
      message.warning(data.message);
      return Promise.reject(data);
    }else{
      return res;
    }
  }, err => {

  });


  return instance(config);
}
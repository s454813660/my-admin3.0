import { CityPicker } from "@/network/cityPick";
import { reactive } from 'vue';
export function useCityPicker() {
  const data = reactive({
    provinceValue: undefined,
    cityValue: undefined,
    areaValue: undefined,
    streetValue: undefined,
    province: "",
    city: "",
    area: "",
    street: "",
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: []
  });

  const resultData = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
    province: "",
    city: "",
    area: "",
    street: ""
  })
  const initProvinceData = () => {
    handleCityPicker({ type: "province" })
  };


  /**
   * 公共接口方法抽离
   */
  const handleCityPicker = (reqData) => {
    CityPicker(reqData).then((res) => {
      data[`${reqData.type}Data`] = res.data.data.data;
    });
  }
  /**
   * 获取地址名称
   */
  const getDomain = ( domain , current) => {
    data[domain] = current.children[0].children;
  }
  /**
   * 初始化省级数据
   */
  initProvinceData();

  /**
   * 省级改变 获取城市
   */
  const changeProvince = (val, current) => {
    getDomain("province", current);
    resetCityPicker({type: "province"});
    handleCityPicker({ type: "city", province_code: val })
  };
  /**
   * 市级改变 获取区县
   */
  const changeCity = (val, current) => {
    getDomain("city", current);
    resetCityPicker({type: "city"});
    handleCityPicker({ type: "area", city_code: val })
  };
  /**
   * 区县改变 获取街道
   */
  const changeArea = (val, current) => {
    getDomain("area", current);
    resetCityPicker({type: "area"});
    handleCityPicker({ type: "street", area_code: val })
  };
  /**
   * 街道改变
   */
  const changeStreet = (val, current) => {
    getDomain("street", current);
    resetCityPicker({type: "street"});
  };

  /**
   * 重置
   */
  const resetCityPicker = (params) => {
    const match = {
      province: ["cityValue", "areaValue", "streetValue"],
      city: ["areaValue", "streetValue"],
      area: ["streetValue"],
      street: []
    }
    match[params.type].forEach(item => {
      data[item] = undefined;
    });
    result()
  }

  /**
   * 获取结果值
   */
  const result = () => {
    for(let key in resultData){
      resultData[key] = data[key] ? data[key] : "";
    }
  }

  /**
   * 清空重置
   */
  const refresh = () => {
    data.provinceValue = undefined;
    resetCityPicker({type: "province"});
    resetCityPicker({type: "city"});
    resetCityPicker({type: "area"});
  }
	return {
    data,
    resultData,
    changeProvince,
    changeCity,
    changeArea,
    changeStreet,
    refresh
  };
}

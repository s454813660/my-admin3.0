import { CityPicker } from "@/network/cityPick";
import { reactive, watch } from 'vue';
export function useCityPicker() {
  const data = reactive({
    provinceValue: undefined,
    cityValue: undefined,
    areaValue: undefined,
    streetValue: undefined,
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
   * 初始化省级数据
   */
  initProvinceData();

  /**
   * 省级改变 获取城市
   */
  const changeProvince = (val) => {
    resetCityPicker({type: "province"});
    handleCityPicker({ type: "city", province_code: val })
  };
  /**
   * 市级改变 获取区县
   */
  const changeCity = (val) => {
    resetCityPicker({type: "city"});
    handleCityPicker({ type: "area", city_code: val })
  };
  /**
   * 区县改变 获取街道
   */
  const changeArea = (val) => {
    resetCityPicker({type: "area"});
    handleCityPicker({ type: "street", area_code: val })
  };
  /**
   * 街道改变
   */
  const changeStreet = (val) => {
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
      resultData[key] = data[key] ? data[key] : ""
    }
  }
	return {
    data,
    resultData,
    changeProvince,
    changeCity,
    changeArea,
    changeStreet
  };
}

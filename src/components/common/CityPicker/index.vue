<template>
	<a-row :gutter="10">
		<a-col :span="6" v-if="init.province">
			<a-select
				placeholder="请选择"
				v-model:value="data.provinceValue"
				@change="changeProvince"
			>
				<a-select-option
					v-for="item of data.provinceData"
					:key="item.PROVINCE_CODE"
					:value="item.PROVINCE_CODE"
				>
					{{ item.PROVINCE_NAME }}
				</a-select-option>
			</a-select>
		</a-col>
		<a-col :span="6" v-if="init.city">
			<a-select
				placeholder="请选择"
				v-model:value="data.cityValue"
				@change="changeCity"
			>
				<a-select-option
					v-for="item of data.cityData"
					:key="item.CITY_CODE"
					:value="item.CITY_CODE"
				>
					{{ item.CITY_NAME }}
				</a-select-option>
			</a-select>
		</a-col>
		<a-col :span="6" v-if="init.area">
			<a-select
				placeholder="请选择"
				v-model:value="data.areaValue"
				@change="changeArea"
			>
				<a-select-option
					v-for="item of data.areaData"
					:key="item.AREA_CODE"
					:value="item.AREA_CODE"
				>
					{{ item.AREA_NAME }}
				</a-select-option>
			</a-select>
		</a-col>
		<a-col :span="6" v-if="init.street">
			<a-select placeholder="请选择"
                v-model:value="data.streetValue"
                @change="changeStreet"
                >
        <a-select-option v-for="item of data.streetData"
                         :key="item.STREET_CODE"
                         :value="item.STREET_CODE"
                         >
                      {{item.STREET_NAME}}
        </a-select-option>
      </a-select>
		</a-col>
	</a-row>
</template>
<script>
import { useCityPicker } from "@/libs/utils/useCityPicker";
import { onBeforeMount, reactive, watch} from "vue"
export default {
	name: "CityPicker",
	props: {
		cityPickerData: {
			type: Object,
			default: () => {},
		},
    cityPickerLevel: {
      type: Array,
			default: () => [],
    },
	},
	setup(props, ctx) {
		const {
			data,
      resultData,
			changeProvince,
			changeCity,
      changeArea,
      changeStreet,
			refresh
		} = useCityPicker();

    const init = reactive({
      province: false,
      city: false,
      area: false,
      street: false,
    })
    /**
     * 初始化citypicker
     */
    const initCityPicker = () => {
      if(props.cityPickerLevel.length === 0) {
        for(let key in init) {
          init[key] = true;
        }
      }
      for(let key in props.cityPickerLevel) {
        init[props.cityPickerLevel[key]] = true;
      }
    }
    onBeforeMount(() => {
      initCityPicker()
    })

		/**
		 * 清空城市选择器
		 */
		const refreshCityPicker = () => {
			refresh();
		}

    watch([
      () => resultData.provinceValue,
      () => resultData.cityValue,
      () => resultData.areaValue,
      () => resultData.streetValue,
    ], ([province, city, area, street]) => {
      ctx.emit("updateRegion", resultData);
    })
		return {
			data,
      init,
			changeProvince,
			changeCity,
      changeArea,
      changeStreet,
			refreshCityPicker
		};
	},
};
/**
 * @cityPickerLevel ["province", "city", "area", "street"]
 * 按需传入，不传默认全部显示
 */
</script>
<style scoped></style>

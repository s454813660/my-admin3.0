<template>
  <a-select v-model:value="selectOptions.value"
            :placeholder="selectOptions.placeholder"
            :allowClear="selectOptions.allowClear"
            :size="selectOptions.size"
            @change="selectChange">
    <a-select-option v-for="(item, index) in selectOptions.options"
                     :key="item.type + index"
                     :value="item.type"
                     :label="item.label"
                     >
                    {{item.label}}  
                  </a-select-option>
  </a-select>
</template>
<script>
import { reactive, ref, onBeforeMount } from 'vue'
export default {
  name: 'Select',
  props: {
    selectOptions: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const selectOptions = reactive({
      value: "",
      options: [],
      allowClear: false,
      size: "small",
      placeholder: ""
    })
    const initOption = () => {
      for(let key in selectOptions) {       
        if(props.selectOptions){
          selectOptions[key] = props.selectOptions[key]
        }
      }
    }
    /**
     * 选择框改变事件处理函数
     */
    const selectChange = (val) => {
      console.log(val);
      ctx.emit("update", val)
    }
    /**
     * 改变值事件处理函数
     */
    onBeforeMount(() => {
      initOption()
    });

    return {
      selectOptions,
      selectChange
    }
  }
}
/**
 * options: {
      value: undefined, 
      options: [ 
        { type: "title", label: "标题"},
        { type: "manager", label: "管理员"},
      ],
      allowClear: true,  是否允许清空当前选项
      size: "large",  
      placeholder: "请输入"
    }
 */
</script>
<style scoped>
</style>

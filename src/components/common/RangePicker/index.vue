<template>
  <a-config-provider :locale="locale">
    <a-range-picker size="large"
                    v-model:value="date"
                    valueFormat="YYYY-MM-DD h:mm:ss"></a-range-picker>
  </a-config-provider>	
</template>
<script>
//国际化配置 中文
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'RangePicker',
  setup() {
    const locale = zhCN;
    return {
      locale
    }
  }
}
</script>
<style scoped>
</style>
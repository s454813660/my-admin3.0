<template>
	<a-modal v-model:visible="visible"
           @cancel="cancel"
          >
    <template #title>
      新增
    </template>
    <a-form :model="form" :wrapper-col="{span: 18}" :label-col="{span:4}" labelAlign="left">
      <a-form-item label="类型">
        <a-select v-model:value="form.category" placeholder="请选择">
          <a-select-option value="123">123</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model:value="form.title" placeholder="请输入内容" />
      </a-form-item>
      <a-form-item label="概况" style="width: 100%">
        <a-textarea v-model:value="form.summary" placeholder="请输入内容" />
      </a-form-item>
    </a-form>
    <template #footer>
      <div class="modalBtn">
        <a-button type="danger" @click="cancel">取消</a-button>
        <a-button type="primary">确认</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { ref, computed, reactive, watch } from "vue";
export default {
  name: "InfoEdit",
  props: {
    editVisible: {
      type: Boolean,
      default: false
    }
  },
	setup(props, ctx) {
    const visible = computed(() => props.editVisible);
    const form = reactive({      
      category: undefined,
      title: undefined,
      summary: undefined
    })

    function cancel() {
      ctx.emit("hideEditModal");
    }
    return {
      visible,
      form,
      cancel,
    }
	},
};
</script>
<style scoped></style>

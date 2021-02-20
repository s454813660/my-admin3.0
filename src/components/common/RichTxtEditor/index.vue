<template>
  <div ref="editor"></div>
  <div class="btn-group">
    <a-button type="primary" @click="commitAsync">提交</a-button>
    <a-button @click="backInfoList">返回</a-button>
  </div>
</template>
<script>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import E from "wangeditor"

export default {
  name: 'RichTxtEditor',
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  emits: {
    commitAsync: payload => {
      // console.log(payload);
    },
    backInfoList: payload => {
      
    }
  },
  setup(props, ctx) {
    const editor = ref();
    const content = reactive({
      html: "",
      text: "",
    })
    let instance;
    onMounted(() => {
      instance = new E(editor.value);
      Object.assign(instance.config, {
          onchange() {
              
          },
          zIndex: 1
      });
      instance.create();
      instance.txt.html(content.html)
    });
    onBeforeUnmount(() => {
        instance.destroy();
        instance = null;
    });
    /**
     * 提交修改事件处理函数
     */
    const commitAsync = () => {
        content.html = instance.txt.html();
        ctx.emit("commitAsync", content.html)
    };
    /**
     * 返回信息列表事件处理函数
     */
    const backInfoList = () => {
      ctx.emit("backInfoList")
    }
    watch(() => props.content, (val) => {
      content.html = val;
      instance.txt.html(val);
    })
    return {
      editor,
      content,
      commitAsync,
      backInfoList
    }
  }
}
</script>
<style scoped lang="scss">
.btn-group {
  margin-top: 12px;
  button {
    margin-right: 10px;
  }
}
</style>
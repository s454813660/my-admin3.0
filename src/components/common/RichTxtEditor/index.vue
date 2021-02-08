<template>
  <div ref="editor"></div>
  <a-button style="margin-top: 10px" type="primary" @click="commitAsync">提交</a-button>
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
    }
  },
  setup(props, ctx) {
    const editor = ref();
    const content = reactive({
      html: "",
      text: ""
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
    const commitAsync = () => {
        content.html = instance.txt.html()
        ctx.emit("commitAsync", content.html)
    };

    watch(() => props.content, (val) => {
      content.html = val
      instance.txt.html(val)
    })
    return {
      editor,
      content,
      commitAsync
    }
  }
}
</script>
<style scoped lang="scss">
</style>
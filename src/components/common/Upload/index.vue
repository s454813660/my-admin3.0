<template>
  <a-upload name="avatar"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            >
    <img v-if="uploadOptions.imageUrl" :src="uploadOptions.imageUrl" alt="avatar" />        
    <div v-else>
      <!-- todo -->
      <loading-outlined v-if="uploadOptions.loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
export default {
  name: 'Upload',
  components: {
    PlusOutlined, LoadingOutlined
  },
  setup() {
    const uploadOptions = reactive({
      fileList: [],
      loading: false,
      imageUrl: '',
    });
    return {
      uploadOptions
    }
  }
}
</script>
<style >
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
<template> 
  <div id="edit-detail">
    <a-form>
      <div class="edit-detail-item category">
        <label for="">信息分类：</label>
        <div class="content-wrap">
          <a-select allowClear placeholder="请选择" style="width: 100%" size="large">
            <a-select-option value="1">1</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="edit-detail-item title">
        <label for="">新闻标题：</label>
        <div class="content-wrap">
          <a-input placeholder="请输入标题" style="height:40px;width:100%"></a-input>
        </div>
      </div>
      <div class="edit-detail-item avatar">
        <label for="">缩略图：</label>
        <div class="content-wrap">
          <Upload />
        </div>
      </div>
      <div class="edit-detail-item date">
        <label for="">发布日期：</label>
        <div class="content-wrap">
          <a-date-picker size="large" style="width: 100%"/>
        </div>
      </div>
      <div class="edit-detail-item content">
        <label for="">详细内容：</label>
        <div class="content-wrap">
          <a-textarea></a-textarea>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script>
import { useRoute } from "vue-router";

import { getList } from "@/network/info";
import { onMounted, reactive } from 'vue';

import Upload from "@/components/common/Upload";
export default {
  name: 'DetailEdit',
  components: {
    Upload
  },
  setup() {
    // 获取当前路由
    const route = useRoute();
    // data
    const data = reactive({
      id: route.params.id || sessionStorage.getItem("infoId"),
    })
    console.log(data);
    // 获取信息方法
    const GetList = (params) => {
			let reqData = {
				categoryId: params? params.categoryId : "",
				startTiem: params? params.startTiem : "",
				endTime: params? params.endTime : "",
				title: params? params.title : "",
				id: params? params.id : "",
				// pageNumber: paginationOptions.current,
        // pageSize: paginationOptions.pageSize
        pageNumber: 1,
        pageSize: 10
			}
			getList(reqData).then(res => {
				console.log(res);
				// key: '1',
				// title: 'John Brown',
				// category: "国内信息",
				// date: "2019-09-10 19:31:31",
				// admin: '管理员',
				// let resData = res.data.data;
				// resData.data.forEach(item => {
        //     item.key = item.id;
        //     item.categoryName = formatCategoryName(item.categoryId)
        //     item.createDate = formatDate(item.createDate*1, "Y-M-D h:m:s")
        //   });
        // info_data.data = resData.data;
        // paginationOptions.total = resData.total;
			}).catch(err=> {})
    };

    onMounted(() => {
      // GetList(data)
    })
    return {
      
    }
  }
}
</script>
<style scoped lang="scss">
.edit-detail-item {
  font-size: 15px;
  label {
    font-weight: 500;
    padding-right: 16px;
  }
  &.category {
    width: 253px;
    margin-top: 28px;
    @include labelDom(120, right, 40)
  }
  &.title {
    width: 455px;
    margin-top: 30px;
    @include labelDom(120, right, 40)
  }
  &.avatar {
    width: 455px;
    margin-top: 36px;
    @include labelDom(120, right, 40);
  }
  &.date {
    width: 356px;
    margin-top: 20px;
    @include labelDom(120, right, 40)
  }
  &.content {
    width: 100%;
    margin-top: 36px;
    @include labelDom(120, right, 40);
  }
}


</style>
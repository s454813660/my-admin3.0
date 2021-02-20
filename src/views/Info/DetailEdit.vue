<template> 
  <div id="edit-detail">
    <a-spin :spinning="data.loading" >
      <a-form>
        <div class="edit-detail-item category">
          <label for="">信息分类：</label>
          <div class="content-wrap">
            <a-select allowClear placeholder="请选择" style="width: 100%"
                      size="large"
                      v-model:value="data.categoryId"
                      >
              <a-select-option v-for="item in data.category"
                              :key="item.id"
                              :value="item.id">{{item.category_name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="edit-detail-item title">
          <label for="">新闻标题：</label>
          <div class="content-wrap">
            <a-input v-model:value="data.title" placeholder="请输入标题" style="height:40px;width:100%"></a-input>
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
            <a-config-provider :locale="locale">
              <a-date-picker v-model:value="data.date"
                            valueFormat="YYYY-MM-DD h:mm:ss"
                            size="large" 
                            style="width: 100%"
                            disabled/>
            </a-config-provider>  
          </div>
        </div>
        <div class="edit-detail-item content">
          <label for="">详细内容：</label>
          <div class="content-wrap">
            <RichTxtEditor :content="data.content"
                          @commitAsync="commitAsync"
                          @backInfoList="backInfoList"></RichTxtEditor>
          </div>
        </div>
      </a-form>
    </a-spin>
  </div>
</template>
<script>
//国际化配置 中文
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { useRoute, useRouter } from "vue-router";

import { getList, editInfo } from "@/network/info";

import { useConfirm } from "@/libs/utils/useConfirm";

import { message } from "ant-design-vue";

//公用分类数据获取
import { useCateData } from "@/network/common";

import { onMounted, reactive, watch } from 'vue';

import { formatDate } from "@/libs/utils/common"

import Upload from "@/components/common/Upload";
import RichTxtEditor from '@/components/common/RichTxtEditor';
export default {
  name: 'DetailEdit',
  components: {
    Upload,
    RichTxtEditor
  },
  setup(props, ctx) {
    const { Confirm } = useConfirm();

    const locale = zhCN;
    // 获取当前路由
    const route = useRoute();
    // 获取路由对象
    const router = useRouter();
    const { categoryData, GetCategoryAll } = useCateData()
    // data
    const data = reactive({
      id: route.params.id || sessionStorage.getItem("infoId"),
      category: [],
      categoryId: undefined,
      title: "",
      date: "",
      content: "",
      loading: true
    })
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
      let reqParams = {
        url: "/news/getList/",
        method: "post",
        data: reqData
      }
			getList(reqParams).then(res => {
        let resData = res.data.data.data[0];
        data.categoryId = resData.categoryId;
        data.title = resData.title;
        data.date = formatDate(resData.createDate, "Y-M-D h:m:s"),
        data.content = resData.content;
        data.loading = false;
				// resData.data.forEach(item => {
        //     item.key = item.id;
        //     item.categoryName = formatCategoryName(item.categoryId)
        //     item.createDate = formatDate(item.createDate*1, "Y-M-D h:m:s")
        //   });
        // info_data.data = resData.data;
        // paginationOptions.total = resData.total;
			}).catch(err=> {})
    };
    /**
     * 修改
     */
    const PutInfo = () => {
      let reqData = {
        id: data.id,
        categoryId: data.categoryId,
        title: data.title,
        imgUrl: "",
        updateDate: "",
        content: data.content,
      };
      editInfo(reqData).then(res => {
        let resData = res.data;
        if(resData.resCode === 0) {
          message.success(resData.message);
          ctx.emit("commit");
          router.back()
        }
      })
    }

    /**
     * 自定义事件通信
     * 提交修改
     */
    const commitAsync = (params) => {
      data.content = params;
      Confirm({
        title: "确认修改吗？",
        success: PutInfo
      })
    }
    /**
     * 自定义事件通信
     * 返回信息列表
     */
    const backInfoList = () => {
      router.back();
    }
    watch(() => categoryData.list, (val) => {
      data.category = val;
    })
    onMounted(() => {
      GetCategoryAll();
      GetList(data)
    })
    return {
      locale,
      data,
      commitAsync,
      backInfoList
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
    width: 60%;
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
    text-align: left;
    @include labelDom(120, right, 40);
  }
}


</style>
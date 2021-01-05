<template>
	<a-modal v-model:visible="visible" @cancel="cancel" :width="576">
		<template #title>
			新增
		</template>
		<a-form :model="form"
            ref="formRef">
      <a-form-item class="form-item">
        <div class="edit-modal-form-label">
          <label for="">分类：</label>
        </div>  
        <a-select v-model:value="form.categoryId" size="large" placeholder="请选择" style="width: 161px">
          <a-select-option v-for="item in form.category"
                           :value="item.id"
                           :key="item.id">
            {{ item.category_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="form-item">
        <div class="edit-modal-form-label">
          <label for="">标题：</label>
        </div> 
        <a-input v-model:value="form.title" placeholder="请输入标题" style="height: 40px; width:425px"></a-input>
      </a-form-item>
      <a-form-item class="form-item">
        <div class="edit-modal-form-label">
          <label for="">内容：</label>
        </div> 
        <a-textarea v-model:value="form.content" placeholder="请输入内容" :autoSize="{minRows: 5}" style="width:425px"></a-textarea>
      </a-form-item>
    </a-form>
		<template #footer>
			<div class="btnGroup">
				<a-button @click="cancel">取消</a-button>
				<a-button type="danger" @click="comfirmEdit">确认</a-button>
			</div>
		</template>
	</a-modal>
</template>
<script>
import { reactive, ref, watch, toRefs, onMounted } from "vue";
//useComfirm
import { useConfirm } from "@/libs/utils/useConfirm";
// api
import { addInfo, editInfo } from "@/network/info";

import { message } from "ant-design-vue";
export default {
	name: "infoEdit",
	props: {
		modalVisible: {
			type: Boolean,
			default: false,
		},
		category: {
			type: Object,
			default: () => {},
    },
    currentItem: {
      type: Object,
			default: () => {},
    },
    editFlag: {
      type: String,
    }
	},
	setup(props, ctx) {
    const formRef = ref(null);
		const { Confirm } = useConfirm();
		const visible = ref(false);
		const form = reactive({
      category: [],
      currentItem: {},
      categoryId: undefined,
      title: "",
      content: "",
      id: ""
    });
    /**
     * handleFn 处理函数
     */
    //resetForm
    const resetForm = () => {
      form.categoryId = undefined;
      form.title = "";
      form.content = ""
    }
		/**
		 * bindEvent
		 */
		const cancel = () => {
      ctx.emit("hideModal");
		};
		const comfirmEdit = () => {
      if(props.editFlag === "put") {
        putInfo();
      }else{
        commitInfo();
      }
    };
    // 修改
    const putInfo = () => {
      // 格式判断
      
      Confirm({
        title: "确认修改当前项吗？",
        success: PutInfo
      })
    }

    //提交
    const commitInfo = () => {
      // 格式判断
      let reqData = {
        categoryId: form.categoryId,
        title: form.title,
        imgUrl: "",
        createDate: "",
        status: "",
        content: form.content,
      };
      addInfo(reqData).then(res => {
        console.log(res);
        let resData = res.data;
        if(resData.resCode === 0) {
          message.success(resData.message);
          ctx.emit("commit")
          resetForm();
          cancel();
        }
      })
    }
		watch(
			() => props.modalVisible,
			() => {
				visible.value = props.modalVisible;
			}
		);
		watch(
			() => props.category.list,
			() => {
				form.category = props.category.list;
			}
    );
    watch(
			() => props.currentItem,
			(val, oldValue) => {
        form.categoryId = val.categoryId;
        form.title = val.title;
        form.content = val.content;
        form.id = val.id
			}
    );

    //修改
    const PutInfo = () => {
      let reqData = {
        id: form.id,
        categoryId: form.categoryId,
        title: form.title,
        imgUrl: "",
        updateDate: "",
        content: form.content,
      };
      editInfo(reqData).then(res => {
        let resData = res.data;
        if(resData.resCode === 0) {
          message.success(resData.message);
          ctx.emit("commit")
          cancel();
        }
      })
    }
		return {
      formRef,
			visible,
			form,
			cancel,
			comfirmEdit,
		};
	},
};
</script>
<style scoped lang="scss">
.form-item {
  width: 485px;
  margin-left: 20px;
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.edit-modal-form-label {
	width: 58px;
	float: left;
	line-height: 40px;
}
.btnGroup {
	text-align: center;
	margin: 0 0 39px 0;
	button {
		width: 150px;
		line-height: 40px;
		height: 40px;
		margin: 0 10px;
	}
}
</style>

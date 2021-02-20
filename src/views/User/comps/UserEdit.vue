<template>
  <div class="user-edit">
    <a-modal v-model:visible="data.userEditVisible"
             @cancel="closeEdit"
             :width="576"
             @ok="handleAddUser"
             :footer="null">
      <!-- modal title start -->
      <template #title>
        <h1>新增</h1>
      </template>
      <!-- modal title end -->

      <!-- form start -->
      <a-form class="user-edit-form"
              :model="data.userFormData"
              :rules="rules"
              ref="userEditForm"
              :labelCol="{span: 4}"
              :wrapperCol="{span: 19,offset: 1}"
              @submit="handleAddUser">
        <a-form-item name="username" label="用户名:" has-feedback class="form-item username" >
          <a-input placeholder="请输入内容"
                     style="height: 40px; width: 100%"
                     v-model:value="data.userFormData.username"></a-input>
        </a-form-item>
        <a-form-item name="name" label="姓名:" has-feedback class="form-item name">
          <a-input placeholder="请输入内容"
                    style="height: 40px; width: 100%"
                    v-model:value="data.userFormData.name"></a-input>
        </a-form-item>
        <a-form-item name="phone" label="手机号:" has-feedback class="form-item phone">
          <a-input placeholder="请输入内容"
                    style="height: 40px; width: 100%"
                    v-model:value="data.userFormData.phone"></a-input>
        </a-form-item>
  
        <a-form-item name="area" label="地区:" class="form-item area">
          <CityPicker :cityPickerData="data.userFormData.cityPickerData"
                        @updateCityPickerData="updateCityPickerData"
                        ></CityPicker>
        </a-form-item>
        <a-form-item name="status" label="是否启用:" class="form-item status">
          <a-radio-group v-model:value="data.userFormData.status">
            <a-radio value="1">禁用</a-radio>
            <a-radio value="2">启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="roles" label="是否启用:" class="form-item roles">
          <a-checkbox-group v-model:value="data.userFormData.rolesChecked">
            <a-checkbox v-for="item in data.roles" 
                        :key="item.role"
                        :value="item.role"
                        >{{item.name}}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item class="btn-group" :wrapperCol="{span: 24}">
          <a-button @click="closeEdit">取消</a-button>
          <a-button type="danger" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
      <!-- form end -->
    </a-modal>
  </div>
</template>
<script>
import SelectComp from "@/components/common/Select";
import CityPicker from "@/components/common/CityPicker";
import { reactive, watch, ref, onBeforeMount } from "vue";
import { getRoles, addUser } from "@/network/user";
import { useConfirm } from "@/libs/utils/useConfirm";
export default {
  name: 'UserEdit',
  components: {
    SelectComp,
    CityPicker
  },
  props: {
    isModalShow: {
      type: Boolean
    }
  },
  
  setup(props, ctx) {
    const comfirm = useConfirm();
    const userEditForm = ref(null)
    const data = reactive({
      userEditVisible: false,
      userFormData: {
        username: "",
        name: "",
        phone: undefined,
        //城市数据对象
        cityPickerData: {},
        status: "1",
        rolesChecked: [],
        roles: []
      },
    });
    /**
     * 校验规则
     */
    let validateUsername = async (rule, value) => {
      if (value === '') {
        return Promise.reject("请输入邮箱！");
      }else {
        return Promise.resolve();
        if(!checkEmail(value)) {
          return Promise.reject("邮箱格式不正确！");
        }else {
          return Promise.resolve();
        }
      }
    };

    /**
     * rules
     */
    const rules = {
      username: [{ validator: validateUsername, trigger: 'change' }],
      roles: [{ required: true, type: "array", message: "必填项"}]
    }
    /**
     * 请求roles
     */
    const GetRoles = () => {
      getRoles().then(res => {
        data.roles = res.data.data
      })
    }
    /**
     * 接受自定义事件修改cityPickerData
     */
    const updateCityPickerData = (payload) => {
      data.userFormData.cityPickerData = payload
    }

    /**
     * 添加用户事件处理函数
     */
    const handleAddUser = () => {
      console.log(data.userFormData);
      console.log(userEditForm);
      // userEditForm.value.resetFields();
    }
    /**
     * 关闭对话框事件处理函数
     */
    const closeEdit = () => {
      ctx.emit("closeEdit", false)
      userEditForm.value.resetFields()
    }
    watch(() => props.isModalShow, (val) => {
      data.userEditVisible = val;
    });
    
    onBeforeMount(() => GetRoles())
    return {
      data,
      rules,
      closeEdit,
      updateCityPickerData,
      userEditForm,
      handleAddUser
    }
  }
}
</script>
<style scoped lang="scss">
.user-edit-form {
  padding: 8px;
}
.form-item {
  
}
.btn-group {
  text-align: center;
  margin-bottom: 32px;
  button {
    width: 150px;
    height: 40px;
    margin: 0 10px;
  }
}
</style>
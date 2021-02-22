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
              @finish="handleAddUser">
        <a-form-item name="username" label="用户名:" has-feedback class="form-item username" >
          <a-input placeholder="请输入用户名"
                  style="height: 40px; width: 100%"
                  v-model:value="data.userFormData.username"></a-input>
        </a-form-item>
        <a-form-item name="password" label="密码:" class="form-item username" >
          <a-input-password placeholder="请输入密码"
                  style="height: 40px; width: 100%"
                  v-model:value="data.userFormData.password"></a-input-password>
        </a-form-item>
        <a-form-item name="name" label="姓名:" has-feedback class="form-item name">
          <a-input placeholder="请输入姓名"
                  style="height: 40px; width: 100%"
                  v-model:value="data.userFormData.name"></a-input>
        </a-form-item>
        <a-form-item name="phone" label="手机号:" has-feedback class="form-item phone">
          <a-input placeholder="请输入手机号"
                  style="height: 40px; width: 100%"
                  v-model:value.number="data.userFormData.phone"
                  ></a-input>
        </a-form-item>
  
        <a-form-item name="area" label="地区:" class="form-item area">
          <CityPicker :cityPickerData="data.userFormData.cityPickerData"
                      @updateCityPickerData="updateCityPickerData"
                      ></CityPicker>
        </a-form-item>
        <a-form-item name="status" label="禁启用状态:" class="form-item status">
          <a-radio-group v-model:value="data.userFormData.status">
            <a-radio value="1">禁用</a-radio>
            <a-radio value="2">启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="rolesChecked" label="是否启用:" class="form-item roles">
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
import { checkEmail, checkPass, stripscript } from "@/libs/validateTools";
import { message } from "ant-design-vue";
import sha1 from "js-sha1";
export default {
  name: 'UserEdit',
  components: {
    SelectComp,
    CityPicker
  },
  props: {
    isModalShow: {
      type: Boolean
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  
  setup(props, ctx) {
    console.log(props.user);
    const userEditForm = ref(null)
    const data = reactive({
      userEditVisible: false,
      userFormData: {
        username: "",
        password: "",
        name: "",
        phone: undefined,
        //城市数据对象
        cityPickerData: {},
        status: "1",
        rolesChecked: [],
        //角色
        roles: []
      },
    });
    
    /**
     * 校验用户名/邮箱
     */
    const validateUsername = async (rule, value) => {
      if (value === '') {
        return Promise.reject("邮箱不能为空！");
      }else {
        if(!checkEmail(value)) {
          return Promise.reject("邮箱格式不正确！");
        }else {
          return Promise.resolve();
        }
      }
    };
    /**
     * 校验用户名/邮箱
     */
    const validatePassword = async (rule, value) => {
      if (value === '') {
        return Promise.reject("密码不能为空！");
      }else {
        if(!checkPass(value)) {
          return Promise.reject("密码格式不正确！请输入6~15位含数字字母符号的密码！");
        }else {
          return Promise.resolve();
        }
      }
    };
    /**
     * 校验规则 rules
     */
    const rules = {
      username: [{ validator: validateUsername, trigger: ['change', "blur"] }],
      password: [{ validator: validatePassword, trigger: ['change', "blur"] }],
      rolesChecked: [{ type: "array", required: true, defaultField: { type: "string" }, message: "必填项"}]
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
    const handleAddUser = (e) => {
      const copydata = JSON.parse(JSON.stringify(data.userFormData));
      const reqData = {
        username: copydata.username,
        truename: copydata.name,
        password: sha1(copydata.password),
        phone: copydata.phone,
        region: JSON.stringify(copydata.cityPickerData),
        status: copydata.status,
        role: JSON.stringify(copydata.rolesChecked)
      }
      
      // ctx.emit("AddUser")
      // return  调试
      addUser(reqData).then(res => {
        if(res.data.resCode === 0) {
          message.success(res.data.message);
          closeEdit();
          ctx.emit("AddUser")
        }
      })
    }
    /**
     * 关闭对话框事件处理函数
     */
    const closeEdit = () => {
      ctx.emit("closeEdit", false)
      userEditForm.value.resetFields()
    }
    watch([ () => props.isModalShow,
            () => props.user ], ([val, user]) => {
      data.userEditVisible = val;
      console.log(user);
      
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
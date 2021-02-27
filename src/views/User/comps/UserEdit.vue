<template>
  <div class="user-edit">
    <a-modal v-model:visible="data.userEditVisible"
             @cancel="closeEdit"
             :width="576"
             @ok="handleSubmit"
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
              @finish="handleSubmit">
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
        <a-form-item name="truename" label="姓名:" has-feedback class="form-item name">
          <a-input placeholder="请输入姓名"
                  style="height: 40px; width: 100%"
                  v-model:value="data.userFormData.truename"></a-input>
        </a-form-item>
        <a-form-item name="phone" label="手机号:" has-feedback class="form-item phone">
          <a-input placeholder="请输入手机号"
                  style="height: 40px; width: 100%"
                  v-model:value.number="data.userFormData.phone"
                  ></a-input>
        </a-form-item>
  
        <a-form-item name="region" label="地区:" class="form-item region">
          <CityPicker 
                      @updateRegion="updateRegion"
                      ref="cityPicker"></CityPicker>
        </a-form-item>
        <a-form-item name="status" label="禁启用状态:" class="form-item status">
          <a-radio-group v-model:value="data.userFormData.status">
            <a-radio value="1">禁用</a-radio>
            <a-radio value="2">启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="role" label="是否启用:" class="form-item roles">
          <a-checkbox-group v-model:value="data.userFormData.role">
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
import { getRoles, addUser, editUser } from "@/network/user";
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
    const userEditForm = ref(null);
    const cityPicker = ref(null);

    const { Confirm } = useConfirm();
    const data = reactive({
      userEditVisible: false,
      //角色
      roles: [],
      userFormData: {
        username: "",
        password: "",
        truename: "",
        phone: undefined,
        //城市数据对象
        region: {},
        status: "1",
        role: []
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
      // 有id 密码为空  不校验
      //  有id 密码不为空 校验
      // 没id 校验
      if(data.userFormData.id && data.userFormData.password === ""){
          return Promise.resolve();
      }else{
        if (value === '') {
          return Promise.reject("密码不能为空！");
        }else {
          if(!checkPass(value)) {
            return Promise.reject("密码格式不正确！请输入6~15位含数字字母符号的密码！");
          }else {
            return Promise.resolve();
          }
        }
      }
      
    };
    /**
     * 校验规则 rules
     */
    const rules = {
      username: [{ validator: validateUsername, trigger: ['change', "blur"] }],
      password: [{ validator: validatePassword, trigger: ['change', "blur"] }],
      role: [{ type: "array", required: true, defaultField: { type: "string" }, message: "必填项"}]
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
     * 接受自定义事件修改r
     */
    const updateRegion = (payload) => {
      data.userFormData.region = payload
    }
    /**
     * 添加用户事件处理函数
     */
    const handleSubmit = (e) => {
      const copydata = JSON.parse(JSON.stringify(data.userFormData));
      const reqData = {
        id: copydata.id? copydata.id: "",
        username: copydata.username,
        truename: copydata.truename,
        password: sha1(copydata.password),
        phone: copydata.phone,
        region: typeof copydata.region === "string" ? copydata.region : JSON.stringify(copydata.region),
        status: copydata.status,
        role: copydata.role.join(",")
      }
      if(data.userFormData.id){
        Confirm({
          title: "确认修改当前项吗？",
          success: () => EditUser(reqData)
        })
      }else{
        AddUser(reqData);
      }
    }
    /**
     * 编辑用户
     */
    const EditUser = (reqData) => {
      editUser(reqData).then(res => {
        if(res.data.resCode === 0){
          message.success(res.data.message);
          closeEdit();
          ctx.emit("refreshUser");
        }
      })
    }
    /**
     * 新增用户
     */
    const AddUser = (reqData) => { 
      // console.log(reqData);
      // // ctx.emit("AddUser")
      // return  //调试
      addUser(reqData).then(res => {
        if(res.data.resCode === 0) {
          message.success(res.data.message);
          closeEdit();
          ctx.emit("refreshUser");
          /// 清空citypicker的值
          cityPicker.value.refreshCityPicker();
        }
      })
    }
    /**
     * 关闭对话框事件处理函数
     */
    const closeEdit = () => {
      ctx.emit("closeEdit", false);
      
      userEditForm.value.resetFields();
      /// 清空citypicker的值
      cityPicker.value.refreshCityPicker();
    }
    watch([ () => props.isModalShow,
            () => props.user ], ([val, user]) => {
      data.userEditVisible = val;
      data.userFormData = JSON.parse(JSON.stringify(user));
      if(Object.keys(user).length > 0){
        data.userFormData.status = data.userFormData.status? "2": "1";
        data.userFormData.role = data.userFormData.role.split(",");
        data.userFormData.password = "";
      }else{
        data.userFormData.status = "1";
      }
    });
    
    onBeforeMount(() => GetRoles())
    return {
      // data
      data,
      // validate rule
      rules,
      //refs
      userEditForm,
      cityPicker,
      // method
      updateRegion,
      closeEdit,
      handleSubmit
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
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item, index) in menuTab"
           :key="index"
           :class="{ current: currentIndex === index }"
           @click="toggleMenu(index)">{{ item.txt }}</li>
      </ul>
      <!-- form表单 -->
      <a-form
        name="custom-validation"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        class="login-form"
      >
        <a-form-item has-feedback label="邮箱" name="username"  class="form-item">
          <a-input v-model:value="ruleForm.username" type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password" class="form-item">
          <a-input v-model:value="ruleForm.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="重复密码" name="checkpass" class="form-item" v-show="menuTab[currentIndex].model === 'register'">
          <a-input v-model:value="ruleForm.checkpass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item name="captcha" label="验证码" class="form-item">
          <a-row :gutter="10">
            <a-col :span="15">
              <a-input v-model:value="ruleForm.captcha" type="text" :maxlength="6" autocomplete="off"/>
            </a-col>
            <a-col :span="9">
              <a-button :disabled="captchaBtnStatus.status" class="ant-btn-success" block @click="GetCaptcha">{{ captchaBtnStatus.text }}</a-button>
            </a-col>
          </a-row>
        </a-form-item> 
        <a-form-item class="">
          <a-button :disabled="false" type="danger" html-type="submit" block class="login-btn">
            {{ menuTab[currentIndex].txt }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
// 请求接口
import { getCaptcha, login } from "@/network/login.js";
import { register } from "@/network/register.js";
//  composition api
import { onMounted, onBeforeMount, reactive, ref } from "vue";
// 验证工具
import { checkEmail, checkPass, stripscript } from "@/libs/validateTools";
// 公用工具
import { awaitWrap } from "@/libs/utils/tools"
// 弹窗组件
import { message } from "ant-design-vue";
export default {
  name: "Login",
  setup(props, ctx) {
    // 获取refs元素
    const ruleFormRef = ref(null);
    // data
    const menuTab = reactive([
      {txt: "登陆", model: "login"}, 
      {txt: "注册", model: "register"}
      ]);
    // 登录/注册按钮状态
    const loginBtnStatus = ref(true);
    // 获取验证码按钮状态
    const captchaBtnStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    // 记录当前状态
    let currentIndex = ref(0);

    // 邮箱验证规则
    let validateUsername = async (rule, value) => {
      if (value === '') {
        return Promise.reject("请输入邮箱！");
      }else {
        if(!checkEmail(value)) {
          return Promise.reject("邮箱格式不正确！");
        }else {
          return Promise.resolve();
        }
      }
    };
    // 密码验证规则
    let validatePass = async (rule, value, callback) => {
      //去除特殊符号（过滤）
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === '') {
        return Promise.reject("请输入密码");
      }else {
        if(!checkPass(value)){
          return Promise.reject("密码格式不正确！");
        }
        return Promise.resolve();
      }
    };
    // 重复密码验证
    let validateCheckpass = async (rule, value, callback) => {
      if(menuTab[currentIndex.value].model === "login") {
        return Promise.resolve();
      }
      ruleForm.checkpass = stripscript(value);
      value = ruleForm.checkpass;
      if(value === "") {
        return Promise.reject("请再次输入密码！")
      }else {
        if(value !== ruleForm.password) {
          return Promise.reject("与第一次输入的密码不一致，请确认！")
        }else{
          return Promise.resolve();
        }
      }
    }

    // 验证码验证规则
    let validateCaptcha = async (rule, value, callback) => {
      if(value === "") {
        return Promise.reject("请输入验证码");
      }else {
        if(!/[0-9A-Za-z]{6,6}/.test(value)){
          return Promise.reject("验证码格式不正确！");
        }
        return Promise.resolve();
      }
    }

    const ruleForm = reactive({
      username: "",
      password: "",
      checkpass: "",
      captcha: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: ['blur'] }],
      password: [{ validator: validatePass, trigger: ['change','blur'] }],
      captcha: [{validator: validateCaptcha, trigger: ['change', 'blur']}],
      checkpass: [{validator: validateCheckpass, trigger: ['change', 'blur']}]
    });
    const layout = reactive({
      layout: "vertical",
      // labelAlign: "left",
      labelCol: { span: 9, offset: 0},
      wrapperCol: { span: 24 },
    });
    // methods
    // 切换注册登录
    function toggleMenu(index) {
      currentIndex.value = index;
      // console.log(ruleFormRef);
      // 切换清除表单
      ruleFormRef.value.resetFields();
      captchaBtnStatus.text = "获取验证码";
    };
    
    async function handleFinish(values) {
      
      // 判断是否是注册，注册就走注册接口，否则走登陆接口
      if(menuTab[currentIndex.value].model === "register"){
        let reqData = {
          username: values.username,
          password: values.password,
          code: values.captcha
        };
        const [err, res] = await awaitWrap(register(reqData));
        console.log(values);
        console.log(res);
        let resData = res? res.data : "";
        if(resData) {
          message.success(resData.message);
          ruleFormRef.value.resetFields();
        };
      }else {
        let reqData = {
          username: values.username,
          password: values.password,
          code: values.captcha
        };
        const [err, res] = await awaitWrap(login(reqData));
        console.log(values);
        console.log(res);
        let resData = res? res.data : "";
        if(resData) {
          message.success(resData.message);
          ruleFormRef.value.resetFields();
        }
      }
    };
    function handleFinishFailed(errors) {
      console.log(errors);
      errors.errorFields.forEach( item => {
        message.warning(item.errors);
      })
    };

    function countdown(delay) {
      let timer = ref(null);
      
      timer = setInterval(() => {
        delay--;
        captchaBtnStatus.text = `倒计时${delay}秒`;
        if(delay < 10) {captchaBtnStatus.text = `倒计时0${delay}秒`};
        if(delay === 0) {
          clearInterval(timer);
          captchaBtnStatus.text = "再次获取";
          captchaBtnStatus.status = false;
          };
      }, 1000);
    }

    // 获取验证码
    function GetCaptcha() {
      // 验证邮箱是否为空，为空则返回false
      if(ruleForm.username === "") {
        message.warning("邮箱不能为空！")
        return false;
      };
      // 验证邮箱格式，不正确则返回false
      if(!checkEmail(ruleForm.username)) {
        message.warning("邮箱格式不正确，请重新输入！");
        return false;
      }
      let reqData = {
          username:ruleForm.username,
          module: menuTab[currentIndex.value].model
        };
      // 改变获取验证码按钮的状态
      captchaBtnStatus.status = true;
      captchaBtnStatus.text = "发送中";
      setTimeout(async () => {
        const [err, res] = await awaitWrap(getCaptcha(reqData));
        let resData = res.data;
        message.success(resData.message);
        console.log(resData);
        loginBtnStatus.value = false;

        countdown(60);
      }, 3000)
    }
    // liefcycle hooks
    onBeforeMount(() => {});
    onMounted(() => {});

    return {
      ruleFormRef,
      // data
      menuTab,
      currentIndex,
      loginBtnStatus,
      captchaBtnStatus,

      ruleForm,
      rules,
      layout,
      // methods
      toggleMenu,
      handleFinish,
      handleFinishFailed,
      GetCaptcha
    };
  }
};
</script>
<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap {
  width: 330px;
  height: 400px;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 80px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
:deep() .login-form {
  margin-top: 35px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .form-item {
    margin-top: 20px;
    padding-bottom: 0;
    .ant-input {
      height: 40px;
      border-radius: 3px;
    }
  }
  .login-btn {
    margin-top: 32px;
  }
  .ant-btn {
    height: 40px;
    line-height: 40px;
  }
}
</style>

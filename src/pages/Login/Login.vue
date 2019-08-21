<template>
    <div class="login_container">
      <LoginHeader></LoginHeader>
      <div class="login_main">
        <div class="l_m_center">
          <div class="header">
            <img src="./../../../static/images/userLogin.png" alt="">
          </div>
          <div class="login_form">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="70px"
                     class="demo-dynamic" :rules="rules" :label-position="'left'">
              <div class="form_item">
                <el-form-item prop="phone" label="手机号*">
                  <el-input v-model="dynamicValidateForm.phone" placeholder="phone"></el-input>
                </el-form-item>
              </div>
              <div class="form_item">
                <el-form-item label="密码*" prop="pass" class="pwd_item">
                  <el-input type="password" v-model="dynamicValidateForm.pass" autocomplete="off"
                            placeholder="password" v-if="!isShowPwd">
                  </el-input>
                  <el-input type="text" v-model="dynamicValidateForm.pass" autocomplete="off"
                            placeholder="password" v-else>
                  </el-input>
                  <span class="showSwitch" @click="showPwd">
                      <svg-icon icon-class="eye"></svg-icon>
                    </span>
                </el-form-item>
                <router-link to="/register" tag="p" class="store_register">商户注册</router-link>
              </div>
            </el-form>
            <div class="btn_container">
              <el-button type="primary" @click="submitForm('dynamicValidateForm')">
                登录</el-button>
            </div>
            <div class="agree">
              <p>登录即同意并遵守《超小厨平台服务协议》</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import LoginHeader from './../../components/LoginHeader';

export default {
  name: 'Login',
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      return callback();
    };
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      return callback();
    };
    return {
      dynamicValidateForm: {
        phone: '15010001001',
        pass: '123456',
      },
      isShowPwd: false,
      rules: {
        phone: [
          { validator: validateName, trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
      },
    };
  },
  rules: {},
  methods: {
    submitForm() {
      this.axios.post('api/cgi/manager/login', {
        "mobile": this.dynamicValidateForm.phone,
        "password": this.dynamicValidateForm.pass,
      }).then((res) => {
        if (res.data.code === 200) {
          res.data.body.manager.pass = this.dynamicValidateForm.pass;
          console.log(res.data.body.manager);
          this.$store.dispatch('setStorage', res.data.body.manager);
          this.$router.push('/dashboard');
        }
      });
    },
    showPwd() {
      if (this.dynamicValidateForm.pass === '') {
        console.log('密码不能为空');
        return;
      }
      this.isShowPwd = !this.isShowPwd;
    },
  },
  components: {
    LoginHeader,
  },
  mounted() {
    if (this.$cookie.get('passport')) {
      this.$router.push('/dashboard');
    }
  },
};
</script>

<style scoped>
  .login_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .login_main{
    width: 100%;
  }
  .l_m_center{
    width: 600px;
    margin: 80px auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding-bottom: 60px;
  }
  .header{
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }
  .login_form{
    padding: 40px 38px 40px;
  }
  .btn_container{
    text-align: center;
  }
  .el-button{
    width: 35%;
  }
  .pwd_item{
    margin-bottom: 0;
  }
  .showSwitch{
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
  .store_register{
    line-height: 14px;
    font-size: 12px;
    text-align: right;
    margin-top: 20px;
    cursor: pointer;
  }
  .agree{
    text-align: center;
    line-height: 40px;
  }
</style>

<template>
  <div>
<!--    <remoteJs :url="'https://map.qq.com/api/js?v=2.exp&key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4'"></remoteJs>-->
<!--    <remoteJs :url="'https://apis.map.qq.com/tools/geolocation/min?key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4&referer=超小厨-web'"></remoteJs>-->
    <LoginHeader></LoginHeader>
    <registerNav :index="indexed"></registerNav>
    <el-form ref="form" :model="registerForm" label-width="160px" class="fm" :rules="rules">
      <component :is="which"></component>
      <!--      <basicInformation ></basicInformation>-->
      <el-form-item>
        <el-button type="primary" @click="next" :plain="true">{{indexed.length == 5?'提交审核':'下一步'}}</el-button>
        <el-button @click="previous">{{indexed.length == 1?'返回':'上一步'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  // import remoteJs from '@/basical/component/mapS';
  import LoginHeader from './../../components/LoginHeader';
  import { checkPhone } from '@/basical/methods'
  import {
    registerNav,
    basicInformation,
    infoRegistration,
    principalMessage,
    mainInformation,
    endSubmit,
  } from '@/components/register';
  // import { vendorApply } from '@/api/vendor';

  export default {
    name: 'register',
    components: {
      registerNav,
      basicInformation,
      infoRegistration,
      principalMessage,
      mainInformation,
      endSubmit,
      LoginHeader,
      // remoteJs,
    },
    data() {
      return {
        which: 'basicInformation',
        componentsName: ['basicInformation', 'infoRegistration', 'principalMessage', 'mainInformation', 'endSubmit'],
        indexed: [1],
        rules: {
          mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          password2: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
          name: [{ required: true, message: '请填写中央厨房名称', trigger: 'blur' }],
          cover: [{ required: true, message: '请上传中央厨房封面' }],
          shortName: [{ required: true, message: '请填写中央厨房简称', trigger: 'blur' }],
          introduction: [{ required: true, message: '请填写中央厨房简介', trigger: 'blur' }],
          description: [{ required: true, message: '请填写中央厨房描述', trigger: 'blur' }],
          ownerName: [{ required: true, message: '请填写负责人姓名', trigger: 'blur' }],
          ownerMobile: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
          ownerCardNo: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
          ownerCardCopyA: [{ required: true, message: '请上传身份证正面' }],
          ownerCardCopyB: [{ required: true, message: '请上传身份证反面' }],
          licenseNo: [{ required: true, message: '请填写营业执照号', trigger: 'blur' }],
          licenseCopy: [{ required: true, message: '请上传营业执照照片' }],
          hygieneLicenseNo: [{ required: true, message: '请填卫生许可证号', trigger: 'blur' }],
          hygieneLicenseCopy: [{ required: true, message: '请上传卫生许可证照片' }],
          alipayNo: [{ required: true, message: '请填写支付宝账号', trigger: 'blur' }],
          bankCardName: [{ required: true, message: '请填写转账银行信息', trigger: 'blur' }],
          bankCardNo: [{ required: true, message: '请填写银行账号', trigger: 'blur' }],
          bankOfDeposit: [{ required: true, message: '请填写开户行位置及名称', trigger: 'blur' }],
        },
      };
    }
    ,
    methods: {
      next() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.indexed.length == 5) {
              if (checkPhone(this.registerForm.mobile)) {
                this.$message.error('手机号格式有误！');
                return;
              }
              if (this.registerForm.password !== this.registerForm.password2) {
                this.$message('两次密码输入不一致！');
                return;
              }

              // let rs = vendorApply();
              this.$message({
                message: '注册成功！',
                type: 'success',
              });
              this.$store.dispatch('clear_from')
              this.$router.push('login');
              return;
            }
            this.indexed.push(1);

            this.which = this.componentsName[this.indexed.length - 1];
          }
        })
      }
      ,
      previous() {
        if (this.indexed.length == 1) {
          this.$router.push('login');
        }
        this.indexed.splice(-1);
        this.which = this.componentsName[this.indexed.length - 1];
      }
      ,
    }
    ,
    beforeCreate() {

    }
    ,
    computed: {
      ...mapState(['registerForm']),
    }
    ,
  };

</script>

<style scoped>

  .el-form-item {
    margin-left: 143px;
    text-align: left;
  }

  .el-message {
    top: 20px;
  }

  .fm {
    width: 900px;
    margin: 60px auto 0;
  }
</style>

<template>
  <div>
    <el-form-item label="手机号" prop="mobile" >
      <el-input v-model="registerForm.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
    <el-input v-model="registerForm.password2" placeholder="输入确认密码" type="password"></el-input>
    </el-form-item>
  </div>
</template>s

<script>
import { mapState } from 'vuex';

export default {

  name: 'basicInformation',
  computed: {
    ...mapState(['registerForm']),
  },
};
</script>

<style scoped>
  .el-form-item{
    font-weight: 700;
    margin-left: 143px;
    width: 420px;
  }
  .fm{
    width: 900px;
    margin: 0 auto;
  }
</style>

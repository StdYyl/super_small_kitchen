<template>
  <div>
    <el-form-item label="营业执照号" prop="licenseNo">
      <el-input placeholder="请填写营业执照号" v-model="registerForm.licenseNo"></el-input>
    </el-form-item>
    <el-form-item label="营业执照照片" prop="licenseCopy" style="width: 800px">
      <el-upload
        class="avatar-uploader"
        action="aaa"
        :show-file-list="false"
        :model="registerForm.licenseCopy"
        :on-change="handleImg"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :before-upload="beforeUpLoad">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="卫生许可证号" prop="hygieneLicenseNo">
      <el-input placeholder="请填写营业执照号" v-model="registerForm.hygieneLicenseNo"></el-input>
    </el-form-item>
    <el-form-item label="卫生许可证照片" prop="hygieneLicenseCopy" style="width: 800px">
      <el-upload
        class="avatar-uploader"
        action="aaa"
        :show-file-list="false"
        :model="registerForm.hygieneLicenseCopy"
        :on-change="handleImgs"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :before-upload="beforeUpLoads">
        <img v-if="imageUrlS" :src="imageUrlS" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="支付宝账号" prop="alipayNo">
      <el-input placeholder="请填写支付宝账号" v-model="registerForm.alipayNo"></el-input>
    </el-form-item>
    <el-form-item label="转账银行信息" prop="bankCardName">
      <el-input placeholder="请填写转账银行信息" v-model="registerForm.bankCardName"></el-input>
    </el-form-item>
    <el-form-item label="银行账号" prop="bankCardNo">
      <el-input placeholder="请填写银行账号" v-model="registerForm.bankCardNo"></el-input>
    </el-form-item>
    <el-form-item label="开户行" prop="bankOfDeposit">
      <el-input placeholder="请填写开户行位置及名称" v-model="registerForm.bankOfDeposit"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input placeholder="请填写备注信息" v-model="registerForm.remark"></el-input>
    </el-form-item>
  </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "mainInformation",
        data() {
            return {
                imageUrl: '',
                imageUrlS: '',
            }
        },
        methods: {
            handleImg(e) {
                this.imageUrl = URL.createObjectURL(e.raw);
            },
            handleImgs(e) {
                this.imageUrlS = URL.createObjectURL(e.raw);
            },
            beforeUpLoad() {
                this.registerForm.licenseCopy = this.imageUrl;
                return false;
            },
            beforeUpLoads() {
                this.registerForm.hygieneLicenseCopy = this.imageUrlS;
                return false;
            }
        },
        mounted() {
            this.imageUrl =  this.registerForm.licenseCopy;
            this.imageUrlS = this.registerForm.hygieneLicenseCopy;
        },
        computed: {
            ...mapState(['registerForm'])
        }
    }
</script>

<style scoped>
  .el-form-item {
    font-weight: 700;
    margin-left: 143px;
    width: 420px;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

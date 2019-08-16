<template>
  <div>
    <el-form-item label="负责人信息" prop="ownerName">
      <el-input placeholder="请填写负责人信息" v-model="registerForm.ownerName"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="ownerMobile">
      <el-input placeholder="请填写联系电话" v-model="registerForm.ownerMobile"></el-input>
    </el-form-item>
    <el-form-item label="省份证号" prop="ownerCardNo">
      <el-input placeholder="请填写身份证号" v-model="registerForm.ownerCardNo"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面照" prop="ownerCardCopyA" style="width: 800px">
      <div class="cardID">
        <el-upload
          class="avatar-uploader"
          action="aaa"
          :show-file-list="false"
          :model="registerForm.ownerCardCopyA"
          :on-change="handleImg"
          accept="image/png,image/gif,image/jpg,image/jpeg"
          :before-upload="beforeUpLoad">
          <img v-if="imageUrlA" :src="imageUrlA" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div style="display: flex;margin-left: 50px">
            <span>照片示例（正面）</span>
            <img src="@/assets/idCard1.png">
        </div>
      </div>
    </el-form-item>
    <el-form-item label="身份证反面照" prop="ownerCardCopyB" style="width: 800px">
      <div class="cardID">
        <el-upload
          class="avatar-uploader"
          action="aaa"
          :show-file-list="false"
          :model="registerForm.ownerCardCopyB"
          :on-change="handleImgs"
          accept="image/png,image/gif,image/jpg,image/jpeg"
          :before-upload="beforeUpLoads">
          <img v-if="imageUrlB" :src="imageUrlB" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div style="display: flex;margin-left: 50px">
          <span>照片示例（正面）</span>
          <img src="@/assets/idCard1.png">
        </div>
      </div>
    </el-form-item>
  </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "principalMessage",
        data() {
            return {
                imageUrlA: '',
                imageUrlB: '',

            }

        },
        methods: {

            beforeUpLoad() {
                this.registerForm.ownerCardCopyA = this.imageUrlA
                return false;
            },
            beforeUpLoads(){
                this.registerForm.ownerCardCopyB = this.imageUrlB
                return false;
            },
            handleImg(e) {
                this.imageUrlA = URL.createObjectURL(e.raw)
            },
            handleImgs(e) {
                this.imageUrlB = URL.createObjectURL(e.raw)
            }
        },
        mounted(){
            this.imageUrlA = this.registerForm.ownerCardCopyA
            this.imageUrlB = this.registerForm.ownerCardCopyB
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

  .cardID {
    display: flex;
  }
  span{
    font-weight: normal;
    font-size: 12px;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 180px;
    height: 116px;
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
    width: 180px;
    height: 116px;
    line-height: 116px;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 116px;
    display: block;
  }
</style>

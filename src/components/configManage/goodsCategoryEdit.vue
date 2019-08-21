<template>
  <div id="categoryEdit">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="categoryTable">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上级分类">
          <el-select :disabled="ruleForm.parentId===''" v-model="ruleForm.region" placeholder="请选择上级分类" value="ruleForm.region">
            <el-option
              v-for="goodsCategoryItem in goodsCategoryList"
              :key="goodsCategoryItem.categoryId"
              :label="goodsCategoryItem.name"
              :value="goodsCategoryItem.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input placeholder="请输入分类名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" prop="sort">
          <el-input placeholder="请输入分类排序" v-model="ruleForm.sort"></el-input>
        </el-form-item>


        <el-form-item label="分类封面" prop="cover">
          <div class="categoryImgLine" @click="selectImg">
            <el-upload
              class="avatar-uploader"
              ref="uploadxls"
              action="/api/"
              :show-file-list="false"
              :model="ruleForm.cover"
              :on-change="handleImg"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              :before-upload="beforeUpLoad">
              <img v-if="ruleForm.cover" :src="/img/ + ruleForm.cover + '/360'" class="avatar" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--            <img :src="/img/ + ruleForm.cover + '/360'" alt="">-->
          </div>

        </el-form-item>



        <el-form-item label="分类描述">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getGoodsCategory,getGoodsCategoryList,editGoodsCategory} from '@/api/goodsCategory';
  import breadcrumb from '@/components/currency/breadcrumb';
  import {getImageOssToken,uploadImage} from '@/api/image';
  export default {
    name: 'goodsCategoryEdit',
    components:{breadcrumb},
    data() {
      return {
        goodsCategoryList:[],
        ruleForm: {
          categoryId:'',
          parentId:'',
          region:'',
          name:'',
          sort:'',
          cover:'',
          tags:{
            hot:false,
            search: false
          },
          description:'',
        },
        rules: {
          name: [
            { required: true, message: '请填写分类名称', trigger: 'blur' },
          ],
          sort:[
            { required: true, message: '请填写顺序', trigger: 'blur' },
          ],
          cover:[
            { required: true, message: '请上传分类图片', trigger: 'blur' },
          ],
        }

      }
    },
    methods: {
      // 阻止图片上传到后台
      beforeUpLoad() {
        //this.ruleForm.cover = this.imageUrl;
        return false;
      },
      // 获取上传图片的地址
      handleImg(file, files) {
        let formData = new FormData();
        getImageOssToken('/cookCategory/').then(value => {
          if (value) {
            formData.append('OSSAccessKeyId', value.accessid);
            formData.append('policy', value.policy);
            formData.append('signature', value.signature);
            formData.append('key', value.dir + '1.' + file.raw.type.split('/')[1]);
            formData.append('success_action_status', 200);
            formData.append('file', file.raw);
            uploadImage(formData).then(val => {
              if (val) {
                console.log(val);
              }
              this.ruleForm.cover = value.dir + '1.' + file.raw.type.split('/')[1];
            })
          }
        });
      },
      selectImg:function(){

      },
      submitForm(formName) {
        this.ruleForm.parentId = this.ruleForm.region;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //接收到的分类信息中tags是json对象"tags":{"hot":true,"search":false}，而修改时接口期望数组"tags": ["hot"]
            //在此进行转化
            /*var tag = [];
            for (var item in this.ruleForm.tags)
              if (`this.ruleForm.tags.${item}`)
                tag.push(item);
            this.ruleForm.tags = tag;*/
            //over
            editGoodsCategory(this.ruleForm).then(value => {
              if (value.code === 200) {
                this.$router.back(-1);
                this.$message({
                  type: 'success',
                  message: '更新成功'
                });
              }else {
                this.$message({
                  type: 'error',
                  message: value.desc
                });
              }
            });
            console.log(this.ruleForm);
            //console.log(editGoodsCategory(this.ruleForm));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back(-1);
      }
    },
    mounted() {

      getGoodsCategory(this.$route.params.id).then(val => {
        //登录实现后，将该语句改为
        if (val) {
          this.ruleForm = val;
          this.ruleForm.region = val.parentId;
        }
        //this.ruleForm = {"code":200,"body":{"categoryId":"RQP8HV8GDLL5Z96","parentId":"","name":"营养早餐","cover":"d0/goodsCategory/190219/y630codxqplokk61.jpg","description":"营养早餐，真的棒666","tags":{"hot":true,"search":false},"sort":1,"status":1},"time":1565943605947}.body;
      });
      getGoodsCategoryList().then(val => {
        this.goodsCategoryList = val;
      });
    }
  };
</script>

<style lang="scss">
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
  #categoryEdit .el-input__inner{
    width: 300px;
  }
  #categoryEdit .el-textarea__inner{
    width: 400px;
  }
  .categoryImgLine {
    width: 100px;
    height: 100px;

    border-radius: 6px;
    cursor: pointer;

    img {
      height: 100px;
      width: 100px;
    }

  }
</style>

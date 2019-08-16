<template>
  <div id="categoryEdit">
    <breadcrumb></breadcrumb>
    <div class="categoryTable">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上级分类">
          <el-select v-model="ruleForm.region" placeholder="请选择上级分类" value="ruleForm.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input placeholder="请输入分类名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" prop="sort">
          <el-input placeholder="请输入分类排序" v-model="ruleForm.sort"></el-input>
        </el-form-item>


        <el-form-item label="分类封面">
          <div>
            <img :src="/img/ + ruleForm.cover + '/360'" alt="">
          </div>
        </el-form-item>



        <el-form-item label="是否热门">
          <el-switch v-model="ruleForm.tags.hot"></el-switch>
        </el-form-item>
        <el-form-item label="是否推荐搜索">
          <el-switch v-model="ruleForm.tags.search"></el-switch>
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
  import {getCookBookCategory} from '@/api/cookBook';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name: 'categoryEdit',
    components:{breadcrumb},
    data() {
      return {
        ruleForm: {
          cookCategoryId:'',
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
        }

      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
      getCookBookCategory(this.$route.params.id).then(val => {
        this.ruleForm = {"code":200,"body":{"cookCategoryId":"RQP8HV8GDLL5Z96","parentId":"","name":"营养早餐","cover":"d0/cookCategory/190219/y630codxqplokk61.jpg","description":"营养早餐，真的棒666","tags":{"hot":true,"search":false},"sort":1,"status":1},"time":1565943605947}.body;
      });
    }
  };
</script>

<style>
  #categoryEdit .el-input__inner{
    width: 300px;
  }
  #categoryEdit .el-textarea__inner{
    width: 400px;
  }
</style>

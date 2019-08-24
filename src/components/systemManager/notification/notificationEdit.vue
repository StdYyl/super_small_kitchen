<template>
  <div id="notificationEdit">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="notificationTable">
      <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item class="shortSelect" label="通知类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择" value="ruleForm.type">
            <el-option
              v-for="typeItem in typeList"
              :key="typeItem.typeId"
              :label="typeItem.name"
              :value="typeItem.typeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="middleSelect" label="通知标题" prop="title">
          <el-input style="width: 500px;" placeholder="请输入通知标题" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章简介" prop="description">
          <el-input style="width: 500px;" type="textarea" placeholder="请输入文章简介"
                    v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="文章详情" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
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
  import { getNotification,editNotification } from '@/api/notification';
  import breadcrumb from '@/components/currency/breadcrumb';

  export default {
    name: 'notificationEdit',
    components: { breadcrumb },
    data() {
      return {
        typeList: [
          {
            typeId: 'system',
            name: '系统通知'
          },
          {
            typeId: 'common',
            name: '公共通知'
          }
        ],
        imageUrl: '',
        ruleForm: {
          content: '',
          description: '',
          notificationId: "",
          time: 0,
          title: '',
          type: ''
        },
        rules: {
          type: [
            { required: true, message: '请填写通知类型', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请填写通知标题', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请填写通知简介', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写通知内容', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editNotification(this.ruleForm)
              .then(value => {
                if (value.code === 200) {
                  this.$router.back(-1);
                  this.$message({
                    type: 'success',
                    message: '更新成功'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: value.desc
                  });
                }
              });
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back(-1);
      },
      init: function () {
        getNotification(this.$route.params.id).then(val => {
          this.ruleForm = val;
        });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style lang="scss">
  #notificationEdit {
    .shortSelect {
      .el-input__inner {
        width: 150px;
      }
    }

    .middleSelect {
      .el-input__inner {
        width: 450px;
      }
    }
  }
</style>

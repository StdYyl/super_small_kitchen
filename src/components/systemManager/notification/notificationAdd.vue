<template>
  <div id="notificationAdd">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="notificationTable">
      <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item class="shortSelect" label="通知类型" prop="type">
          <!--          -->
        </el-form-item>
        <div>
          <el-select v-model="ruleForm.type" placeholder="请选择" value="ruleForm.type">
            <el-option
              v-for="typeItem in typeList"
              :key="typeItem.typeId"
              :label="typeItem.name"
              :value="typeItem.typeId"></el-option>
          </el-select>
        </div>
        <el-form-item class="middleSelect" label="通知标题" prop="title">

        </el-form-item>
        <div>
          <el-input style="width: 500px;" placeholder="请输入通知标题" v-model="ruleForm.title"></el-input>
        </div>
        <el-form-item label="通知简介" prop="description">

        </el-form-item>
        <div>
          <el-input style="width: 500px;" type="textarea" placeholder="请输入通知简介"
                    v-model="ruleForm.description"></el-input>
        </div>
        <el-form-item label="通知详情" prop="content">

        </el-form-item>
        <div class="app-container calendar-list-container">
          <div style="width: 90%;">
            <editor
              class="editor"
              :value="content"
              :setting="editorSetting"
              @show="editors"
              :with-credentials="withCredentials"
              @on-upload-fail="onEditorReady"
              @on-upload-success="onEditorUploadComplete"></editor>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { addNotification } from '@/api/notification';
  import breadcrumb from '@/components/currency/breadcrumb';
  import editor from '@/components/currency/tinymceEditor';

  export default {
    name: 'notificationAdd',
    components: { breadcrumb, editor },
    data() {
      var validateType = (rule, value, callback) => {
        if (!this.ruleForm.type) {
          return callback(new Error('请填写通知类型'));
        }
      };
      var validateTitle = (rule, value, callback) => {
        if (!this.ruleForm.title) {
          return callback(new Error('请填写通知标题'));
        }
      };
      var validateDescription = (rule, value, callback) => {
        if (!this.ruleForm.description) {
          return callback(new Error('请填写通知简介'));
        }
      };
      var validateContent = (rule, value, callback) => {
        if (!this.content) {
          return callback(new Error('请填写通知内容'));
        }
      };
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
        editorSetting: { // 配置富文本编辑器高
          height: 500
        },
        withCredentials: true,
        content: '', // 富文本编辑器双向绑定的内容
        ruleForm: {
          content: '',
          description: '',
          title: '',
          type: ''
        },
        rules: {
          type: [
            { required: true, validator: validateType, trigger: 'blur' }
          ],
          title: [
            { required: true, validator: validateTitle, trigger: 'blur' },
          ],
          description: [
            { required: true, validator: validateDescription, trigger: 'blur' },
          ],
          content: [
            { required: true, validator: validateContent, trigger: 'blur' },
          ],
        }
      };

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.content = this.content;
            addNotification(this.ruleForm)
              .then(value => {
                if (value.code === 200) {
                  this.$router.back(-1);
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: value.desc
                  });
                }
              });
            //console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back(-1);
      },
      editors(content) { // editor组件传过来的值赋给content
        //console.log(content)
        this.content = content;
      },
      onEditorReady(ins, ina) { // 上传失败的函数
        console.log('ins');
        console.log(ins);
        console.log(ina);
      },
      onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
        console.log('json');
        console.log(json);
        console.log(json[0].data.filePath);
        //this.content = this.content + '<img src=' + json[0].data.filePath + '>'
      }
    }
  };
</script>

<style lang="scss">
  #notificationAdd {
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

    .el-form-item {
      display: flex;
    }

    .el-form-item__label {
      flex: 1;
    }

    .el-form-item__content {
      flex: 7;
    }

    .el-form-item__error {
      top: 30%;
    }

    .el-form--label-top .el-form-item__label {
      padding: 0;
    }

    .app-container {
      margin-bottom: 15px;
    }
  }
</style>

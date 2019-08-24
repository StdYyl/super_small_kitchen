<template>
  <div id="notificationAdd">
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
        <el-form-item label="通知简介" prop="description">
          <el-input style="width: 500px;" type="textarea" placeholder="请输入通知简介"
                    v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="通知详情">
          <div class="app-container calendar-list-container">
            <div style="width: 90%;">
              <editor
                class="editor"
                :value="content"
                :setting="editorSetting"
                @show="editors"
                :with-credentials = "withCredentials"
                @on-upload-fail         = "onEditorReady"
                @on-upload-success= "onEditorUploadComplete"></editor>
            </div>
          </div>
        </el-form-item>
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
  import editor from '@/components/currency/tinymceEditor'
  export default {
    name: 'notificationAdd',
    components: { breadcrumb,editor },
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
        this.content = content
      },
      onEditorReady(ins, ina) { // 上传失败的函数
        console.log('ins')
        console.log(ins)
        console.log(ina)
      },
      onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
        console.log('json')
        console.log(json)
        console.log(json[0].data.filePath)
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
  }
</style>

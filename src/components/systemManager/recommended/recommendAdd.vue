<template>
  <div class="recommend">
    <el-form ref="recommendList" :rules="rules" :model="recommendList" label-position="top">
      <el-form-item prop="name">
        <el-input placeholder="请输入专题名称" v-model="recommendList.name" class="recommendRemove"></el-input>
      </el-form-item>
      <el-form-item label="专题标识">
        <el-input placeholder="请输入专题标识" v-model="recommendList.featureId" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="专题分类" class="recommendRadio" prop="type">
        <div style="margin-bottom: 20px">
          <el-radio-group v-model="recommendList.type">
            <el-radio label="banner1" border>轮播图</el-radio>
          </el-radio-group>
        </div>
        <div v-if="recommendList.type == 'banner1'">
          <div class="addClassify lf" v-for="(itemed,index) in recommendList.item.length" :key="index">
            <div class="addClassify_head">
              <span style="font-size: 16px">内容{{index}}</span>
              <img src="@/assets/delete.png" @click="removeSlides(index)">
            </div>
            <div style="display: flex;margin: 25px 0">
              <div style="padding:0 15px">类型</div>
              <el-select style="width: 300px" v-model="recommendList.item[index].type">
                <el-option label="图片" value="type1"></el-option>
                <el-option label="cookbook" value="type2"></el-option>
              </el-select>
            </div>
            <div style="display: flex;margin: 25px 0">
              <div style="padding:0 15px">名称</div>
              <el-input placeholder="名称" style="width: 300px" v-model="recommendList.item[index].name"></el-input>
            </div>
            <div style="display: flex;margin: 25px 0">
              <div style="padding:0 15px">封面</div>
              <el-upload
                class="avatar-uploader"
                action="a"
                :show-file-list="false"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :on-change="(file,fileList)=>{ return  handleImg(file,fileList,index)}"
                :before-upload="()=>false">
                <img v-if="recommendList.item[index].cover" :src="'/img/'+recommendList.item[index].cover+'/360'"
                     class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div style="text-align: center;clear: both;">
            <el-button type="info" @click="addSlides">继续添加</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="专题排序" prop="sort">
        <el-input placeholder="例如:0(数字越小越靠前)" v-model="recommendList.sort"
                  style="width: 200px;display: block"></el-input>
      </el-form-item>
      <div style="margin:20px 0 0 110px">
        <el-button type="primary" @click="subSlides">立即添加</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { createRecommend } from '@/api/admin';
  import {pullImg} from '@/api/image'

  export default {
    name: 'recommendAdd',
    data() {
      return {
        recommendList: {
          name: '',
          featureId: '',
          item: [{ name: '', type: '', cover: '', goodsId: '' }],
          sort: '',
          type: '',
          status: 2
        },
        rules: {
          name: [{ required: true, message: '请填写专题名称', trigger: ['blur', 'change'] }],
          type: [{ required: true, message: '请填写专题名称' }],
          sort: [{ required: true, message: '请输入排序方式', trigger: ['blur', 'change'] }]
        },
      };
    },
    methods: {
      //将图片上传至服务器
      async handleImg(e, fileList, index) {
        let rs = await pullImg('/feature/',e)
        this.recommendList.item[index].cover = rs
      },
      //添加模块
      addSlides() {
        this.recommendList.item.push({ name: '', type: '', cover: '', goodsId: '' });
      },
      //删除模块
      removeSlides(e) {
        this.recommendList.item.splice(e, 1);
      },
      //提交
      subSlides() {
        let isTrue = true;
        this.$refs.recommendList.validate(async rs => {
          if (rs) {
            if (this.recommendList.featureId === '') {
              this.alertMes('缺少专题ID', 'error');
              return;
            }
            this.recommendList.item.filter(item => {
              if (item.name == '' || item.cover == '' || item.type == '') {
                this.alertMes('每个分类的封面、类型必须填写或上传', 'info');
                isTrue = false;
              }
            });
            if (isTrue) {
              let rs = await createRecommend(this.recommendList);
              if (rs.data.code == 200) {
                this.alertMes('添加成功', 'success');
                this.$router.go('-1')
              }
            }
          }
        });
      },
      alertMes(message, type) {
        this.$message({
          message,
          type
        });
      }
    },
  };
</script>

<style>
  .recommendRemove input.el-input__inner {
    border: 0px;
    font-size: 24px;
  }

  .recommend .el-form-item__label {
    padding: 0;
  }

  .recommendRadio .el-radio.is-bordered.is-checked {
    border-color: #7980ff;
  }

  .recommendRadio .el-radio__input.is-checked .el-radio__inner {
    border-color: #7980ff;
    background: #7980ff;
  }

  .recommendRadio .el-radio__input.is-checked + .el-radio__label {
    color: #7980ff;
  }

  .recommend .el-form-item {
    margin-bottom: 9px;
  }

  .addClassify {
    margin: 10px;
    margin-left: 0;
    border: 1px solid #dcdfe6;
    width: 500px;
    float: left;
  }

  .addClassify_head {
    background: #f5f5f8;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: normal;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
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

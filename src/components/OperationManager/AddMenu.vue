<template>
    <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          菜谱管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜谱添加</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">菜谱添加</p>
    </div>
    <div class="main">
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 label-width="120px" :label-position="'top'">
          <div class="form_container">
            <div class="form_item">
              <el-input autocomplete="off" v-model="ruleForm.goodsName"
                        placeholder="请输入商品名称"></el-input>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品分类" prop="goodsSort">
                <el-cascader
                  v-model="goodsSort"
                  :options="goodsOptions"
                  @change="handleChange"></el-cascader>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="可见范围" prop="visibleRange">
                <el-select v-model="ruleForm.visibleRange" placeholder="活动区域">
                  <el-option label="全部" value="全部"></el-option>
                  <el-option label="连锁" value="连锁"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品封面" prop="goodsImg">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="goodsImgUrl" :src="goodsImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__tip" slot="tip">上传一张最佳的效果图，有助于提高购买率</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品展示图">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="goodsShowImgUrl" :src="goodsShowImgUrl" class="avatar avatar_small">
                  <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品详情图" prop="goodsDetailImg">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="goodsDetailImgUrl" :src="goodsDetailImgUrl"
                       class="avatar avatar_small">
                  <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                  <div class="el-upload__tip" slot="tip">上传一张最佳的效果图，有助于提高购买率</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品描述">
                <el-input type="textarea" v-model="ruleForm.goodsDescription"
                          style="width: 500px;" placeholder="请填写商品描述"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 label-width="120px" :label-position="'right'">
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="菜谱选择">
                <el-button type="primary" plain @click="dialogMenuVisible = true">选择菜谱</el-button>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="相关商品关联">
                <el-button type="primary" plain @click="dialogGoodsVisible = true">选择商品</el-button>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-button type="primary">添加</el-button>
              <el-button>取消</el-button>
            </div>
          </div>
        </el-form>
        <el-dialog title="菜谱选择" :visible.sync="dialogMenuVisible">
          <el-form :model="menuSelect">
            <div class="el_item">
              <el-input v-model="menuSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="菜谱名称"></el-input>
              <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="menuData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column label="菜谱封面" min-width="2" :align="'center'">
                  <template slot-scope="scope">
                    <img :src="'./../../../static/images/role_member.png'" alt="">
                  </template>
                </el-table-column>
                <el-table-column prop="goodsName" label="菜谱名称" min-width="3">
                </el-table-column>
                <el-table-column label="操作" min-width="3" :align="'center'">
                  <template slot-scope="scope">
                    <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">选择</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMenuVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogMenuVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="商品选择" :visible.sync="dialogGoodsVisible">
          <el-form :model="menuSelect">
            <div class="el_item">
              <el-input v-model="menuSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="商品名称"></el-input>
              <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="menuData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column label="商品封面" min-width="2" :align="'center'">
                  <template slot-scope="scope">
                    <img :src="'./../../../static/images/role_member.png'" alt="">
                  </template>
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称" min-width="3">
                </el-table-column>
                <el-table-column label="操作" min-width="3" :align="'center'">
                  <template slot-scope="scope">
                    <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">选择</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogGoodsVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogGoodsVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMenu',
  data() {
    return {
      ruleForm: {
        goodsName: '',
        visibleRange: '',
        goodsDescription: '',
      },
      menuSelect: {
        searchName: '',
      },
      rules: {
        goodsSort: [
          { required: true, message: '请选择商品种类', trigger: 'blur' },
        ],
        visibleRange: [
          { required: true, message: '请选择可见范围', trigger: 'blur' },
        ],
        goodsImg: [
          { required: true, message: '图片必须上传', trigger: 'blur' },
        ],
        goodsDetailImg: [
          { required: true, message: '图片必须上传', trigger: 'blur' },
        ],
      },
      goodsSort: '',
      goodsImgUrl: '',
      goodsShowImgUrl: '',
      goodsDetailImgUrl: '',
      goodsOptions: [{
        value: '平顶锅',
        label: '平顶锅',
        children: [{
          value: '小号锅1',
          label: '小号锅1',
        }, {
          value: '小号锅2',
          label: '小号锅2',
        },
        ],
      }, {
        value: '蔬菜',
        label: '蔬菜',
        children: [{
          value: '黄瓜',
          label: '黄瓜',
        }, {
          value: '西红柿',
          label: '西红柿',
        },
        ],
      }],
      step_num: 1,
      menuData: [],
      dialogMenuVisible: false,
      dialogGoodsVisible: false,
    };
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleChange(value) {
      console.log(value);
    },
  },
  filters: {
  },
  watch: {},
};
</script>

<style scoped lang="scss">
  .header{
    margin: 34px 0 20px 0 ;
    padding-left: 20px;
    padding-top: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }
  .title{
    font: normal 500 20px/56px '微软雅黑';
  }
  div.is-top{
    font-size: 18px;
  }
  .main{
    padding: 23px 30px;
    border: 1px solid #ddd;
    background-color: #fff;
    margin-bottom: 20px;
    .form{
      width: 100%;
      .form_container{
        width: 100%;
        display: flex;
        align-items: center;
        .form_item{
          width: 100%;
          .el-upload__tip{
            font: normal 400 14px/14px '微软雅黑';
            color: rgb(153, 153, 153);
          }
        }
      }
      .el_item{
        display: flex;
        margin-bottom: 20px;
        align-items: center;
      }
    }
  }
  /*上传图片模块*/
  .avatar-uploader i{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar-uploader-icon_small{
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .avatar_small{
    width: 90px;
    height: 90px;
  }
  .amap {
    height: 300px;
  }
  .router-link-active{
    margin-left: 10px;
  }
</style>

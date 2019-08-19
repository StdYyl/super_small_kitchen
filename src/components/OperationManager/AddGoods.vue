<template>
  <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          商品库管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品库添加</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">商品库添加</p>
    </div>
    <div class="main">
      <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules"
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
                  v-model="ruleForm.goodsSort"
                  :options="goodsOptions"
                  @change="handleChange"></el-cascader>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="可见范围" prop="visibleRange">
                <el-select v-model="ruleForm.visibleRange" placeholder="活动区域">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品封面" prop="goodsImgUrl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleGoodsImgAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.goodsImgUrl" :src="ruleForm.goodsImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__tip" slot="tip">上传一张最佳的效果图，有助于提高购买率</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品展示图" prop="goodsShowImgUrl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleGoodsShowAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.goodsShowImgUrl" :src="ruleForm.goodsShowImgUrl" class="avatar avatar_small">
                  <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="商品详情图" prop="goodsDetailImgUrl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleGoodsDetailAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.goodsDetailImgUrl" :src="ruleForm.goodsDetailImgUrl"
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
                <el-button type="primary" plain @click="selectMenuList">选择菜谱</el-button>
                <div v-if="ruleForm.isSelectedMenu" style="margin-top: 10px;display: flex;align-items: center">
                  <div :style="'width:80px;height:80px;background:url('+/img/+ruleForm.selectedMenu.cover+'/360) center center / cover no-repeat;'"></div>
                  <span :style="'margin: 0 20px 0 10px;'">{{ruleForm.selectedMenu.name}}</span>
                  <el-button type="danger" plain @click="deleteMenu">删除</el-button>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-form-item label="相关商品关联">
                <el-button type="primary" plain @click="selectGoodsList">选择商品</el-button>
                <div v-if="ruleForm.isSelectedGoods" style="margin-top: 10px;display: flex;align-items: center">
                  <div :style="'width:80px;height:80px;background:url('+/img/+ruleForm.selectedGoods.cover+'/360) center center / cover no-repeat;'"></div>
                  <span :style="'margin: 0 20px 0 10px;'">{{ruleForm.selectedGoods.name}}</span>
                  <el-button type="danger" plain @click="deleteGoods">删除</el-button>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <el-button type="primary" @click="goodsAdd('ruleForm')">添加</el-button>
              <router-link to="/dashboard/operationManger/commodityStoreManage">
                <el-button>取消</el-button>
              </router-link>
            </div>
          </div>
        </el-form>
        <el-dialog title="菜谱选择" :visible.sync="dialogMenuVisible">
          <el-form :model="menuSelect">
            <div class="el_item">
              <el-input v-model="menuSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="菜谱名称" @keydown.enter="searchMenu"></el-input>
              <el-button type="primary" style="margin-left: 10px;" @click="searchMenu">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="menuData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column label="菜谱封面" prop="cover" min-width="2" :align="'center'">
                  <template slot-scope="scope">
                    <div style="display: flex;justify-content: center;align-items: center">
                      <div :style="'width:80px;height:80px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="菜谱名称" min-width="3">
                </el-table-column>
                <el-table-column label="操作" min-width="3" :align="'center'" prop="cookbookId">
                  <template slot-scope="scope">
                    <a :href="'#'" style="color:#409eff;" @click.prevent="selectMenu(scope.row.cookbookId)">选择</a>
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
          <el-form :model="goodsSelect">
            <div class="el_item">
              <el-input v-model="goodsSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="商品名称" @keydown.enter="searchGoods"></el-input>
              <el-button type="primary" style="margin-left: 10px;" @click="searchGoods">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="goodsData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column label="商品封面" prop="cover" min-width="2" :align="'center'">
                  <template slot-scope="scope">
                    <div style="display: flex;justify-content: center;align-items: center">
                      <div :style="'width:80px;height:80px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称" min-width="3">
                </el-table-column>
                <el-table-column label="操作" min-width="3" :align="'center'" prop="goodsId">
                  <template slot-scope="scope">
                    <a :href="'#'" style="color:#409eff;" @click.prevent="selectGoods(scope.row.goodsId)">选择</a>
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
  name: 'AddGoods',
  data() {
    return {
      ruleForm: {
        goodsName: '',
        goodsSort: '',
        visibleRange: '',
        goodsImgUrl: '',
        goodsShowImgUrl: '',
        goodsDetailImgUrl: '',
        goodsDescription: '',
        selectedMenu: null,
        isSelectedMenu: false,
        selectedGoods: null,
        isSelectedGoods: false,
      },
      menuSelect: {
        searchName: '',
      },
      goodsSelect: {
        searchName: '',
      },
      rules: {
        goodsSort: [
          { required: true, message: '请选择商品种类', trigger: 'change' },
        ],
        visibleRange: [
          { required: true, message: '请选择可见范围', trigger: 'change' },
        ],
        goodsImgUrl: [
          { required: true, message: '图片必须上传' },
        ],
        goodsShowImgUrl: [
          { required: true, message: '图片必须上传' },
        ],
        goodsDetailImgUrl: [
          { required: true, message: '图片必须上传' },
        ],
      },
      options: [{
        value: '自营',
        label: '自营',
      }, {
        value: '非自营',
        label: '非自营',
      }, {
        value: '连锁',
        label: '连锁',
      }],
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
      goodsData: [],
      dialogMenuVisible: false,
      dialogGoodsVisible: false,
    };
  },
  methods: {
    goodsAdd(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.ruleForm.goodsName);
          console.log(this.ruleForm.goodsSort);
          console.log(this.ruleForm.visibleRange);
          console.log(this.ruleForm.goodsImgUrl);
          console.log(this.ruleForm.goodsShowImgUrl);
          console.log(this.ruleForm.goodsDetailImgUrl);
          console.log(this.ruleForm.goodsDescription);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleGoodsImgAvatarSuccess(res, file) {
      this.ruleForm.goodsImgUrl = URL.createObjectURL(file.raw);
    },
    handleGoodsShowAvatarSuccess(res, file) {
      this.ruleForm.goodsShowImgUrl = URL.createObjectURL(file.raw);
    },
    handleGoodsDetailAvatarSuccess(res, file) {
      this.ruleForm.goodsDetailImgUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isValidate = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isValidate) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isValidate && isLt2M;
    },
    handleChange(value) {
      console.log(value);
    },
    selectMenuList() {
      this.axios.get('api/cgi/m/cookbook/select').then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.menuData = res.data.body.list;
            this.dialogMenuVisible = true;
          }
        }
      });
    },
    searchMenu() {
      console.log(this.menuSelect.searchName);
      this.axios.get('api/cgi/m/cookbook/select?search='+this.menuSelect.searchName).then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            console.log(res.data.body.list);
            this.menuData = res.data.body.list;
          }
        }
      });
    },
    selectMenu(cookbookId) {
      console.log(cookbookId);
      this.axios.get('api/cgi/m/cookbook/select?search='+cookbookId).then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.ruleForm.selectedMenu = res.data.body.list[0];
            this.ruleForm.isSelectedMenu = true;
            this.dialogMenuVisible = false;
          }
        }
      });
    },
    deleteMenu() {
      this.ruleForm.isSelectedMenu = false;
      this.ruleForm.selectedMenu = null;
    },
    selectGoodsList() {
      this.axios.get('api/cgi/m/goods/select').then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.goodsData = res.data.body.list;
            this.dialogGoodsVisible = true;
          }
        }
      });
    },
    searchGoods() {
      console.log(this.goodsSelect.searchName);
      this.axios.get('api/cgi/m/goods/select?search='+this.goodsSelect.searchName).then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.goodsData = res.data.body.list;
          }
        }
      });
    },
    selectGoods(goodsId) {
      console.log(goodsId);
      this.axios.get('api/cgi/m/goods/select?search='+goodsId).then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.ruleForm.selectedGoods = res.data.body.list[0];
            this.ruleForm.isSelectedGoods = true;
            this.dialogGoodsVisible = false;
          }
        }
      });
    },
    deleteGoods() {
      this.ruleForm.isSelectedGoods = false;
      this.ruleForm.selectedGoods = null;
    },
  },
  mounted() {

  }
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


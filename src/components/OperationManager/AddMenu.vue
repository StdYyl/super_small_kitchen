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
        <div class="form_left">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                   label-width="120px" :label-position="'top'">
            <div class="form_container">
              <div class="form_item">
                <el-input autocomplete="off" v-model="ruleForm.menuName"
                          placeholder="请输入菜谱名称" style="width: 250px;"></el-input>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱分类" prop="menuSort">
                  <el-select v-model="menuSort" placeholder="请选择">
                    <el-option-group
                      v-for="group in menuOptions"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱封面" prop="menuImg">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="menuImgUrl" :src="menuImgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">上传一张最佳的效果图，有助于提高购买率</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱展示图" prop="menuShowImg">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="menuShowImgUrl" :src="menuShowImgUrl" class="avatar avatar_small">
                    <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜品原料">
                  <div class="table_container">
                    <el-table
                      :data="materialData"
                      style="width: 100%"
                      :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                      <el-table-column prop="materialName" label="材料名" :align="'center'">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="materialData.materialName"
                                    placeholder="请输入材料名"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="materialAmount" label="用量" :align="'center'">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="materialData.materialAmount"
                                    placeholder="请输入用量"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" :align="'center'">
                        <template slot-scope="scope">
                          <el-button type="danger" plain>删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="form_right">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                   label-width="120px" :label-position="'left'">
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="口味" prop="flavorName">
                  <el-input type="text" v-model="ruleForm.flavorName"
                            style="width: 200px;" placeholder="请输入口味名"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="难度" prop="difficulty">
                  <el-input type="text" v-model="ruleForm.difficulty"
                            style="width: 200px;" placeholder="请输入难度"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="用时" prop="useTime">
                  <el-input type="text" v-model="ruleForm.useTime"
                            style="width: 200px;" placeholder="请输入用时"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱步骤">
                  <el-button type="primary"
                             @click="addStep">步骤添加</el-button>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                  <div class="table_container">
                    <el-table
                      :data="menuStep"
                      style="width: 100%"
                      :show-header="false">
                      <el-table-column width="110" :align="'center'">
                        <template slot-scope="scope">
                          <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="menuStep.stepImg"
                                 :src="menuStep.stepImg" class="avatar avatar_small">
                            <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                          </el-upload>
                        </template>
                      </el-table-column>
                      <el-table-column width="200px" :align="'center'">
                        <template slot-scope="scope">
                          <el-input type="textarea" v-model="menuStep.stepDetail"
                                    placeholder="请输入步骤详情" style="width: 100%"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column width="90" :align="'center'">
                        <template slot-scope="scope">
                          <el-button type="danger" plain>删除</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column width="130" :align="'center'">
                        <template slot-scope="scope">
                          <el-button type="default"
                                     plain @click="dialogTagVisible=true">绑定指令集</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱描述">
                  <el-input type="textarea" v-model="ruleForm.menuDescription"
                            style="width: 350px;" placeholder="请填写菜谱描述"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="智能锅选择">
                  <el-button type="primary"
                             plain @click="dialogPanVisible = true">选择智能锅</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <el-dialog title="指令集选择" :visible.sync="dialogPanVisible">
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
            <el-button @click="dialogPanVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogPanVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="商品选择" :visible.sync="dialogTagVisible">
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
            <el-button @click="dialogTagVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogTagVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="submit_container">
        <el-button type="primary">保存</el-button>
        <router-link to="/dashboard/operationManger/menuManage" active-class="return">
          <el-button type="default" plain>取消</el-button>
        </router-link>
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
        menuName: '',
        flavorName: '',
        difficulty: '',
        useTime: '',
        menuDescription: '',
      },
      menuSelect: {
        searchName: '',
      },
      menuStep: [
        {
          stepImg: '',
          stepDetail: '',
        },
      ],
      rules: {
        menuSort: [
          { required: true, message: '请选择商品种类', trigger: 'blur' },
        ],
        flavorName: [
          { required: true, message: '请输入口味名', trigger: 'blur' },
        ],
        difficulty: [
          { required: true, message: '请输入难度', trigger: 'blur' },
        ],
        useTime: [
          { required: true, message: '请输入用时', trigger: 'blur' },
        ],
        menuImg: [
          { required: true, message: '图片必须上传', trigger: 'blur' },
        ],
        menuShowImg: [
          { required: true, message: '图片必须上传', trigger: 'blur' },
        ],
        menuDetailImg: [
          { required: true, message: '图片必须上传', trigger: 'blur' },
        ],
      },
      menuSort: '',
      menuImgUrl: '',
      menuShowImgUrl: '',
      menuDetailImgUrl: '',
      menuOptions: [{
        label: '营养早餐',
        options: [{
          value: '营养粥1',
          label: '营养粥1',
        }, {
          value: '营养粥2',
          label: '营养粥2',
        }],
      }, {
        label: '老人餐',
        options: [{
          value: '老人素食',
          label: '老人素食',
        }, {
          value: '老人软食',
          label: '老人软食',
        }],
      }, {
        label: '加班餐',
        options: [{
          value: '营养暖胃',
          label: '营养暖胃',
        }],
      }, {
        label: '月子餐',
        options: [{
          value: '月子面',
          label: '月子面',
        }],
      }],
      step_num: 1,
      menuData: [],
      materialData: [
        {
          materialName: '',
          materialAmount: '',
        }, {
          materialName: '',
          materialAmount: '',
        },
      ],
      dialogPanVisible: false,
      dialogTagVisible: false,
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
    addStep() {
      this.menuStep.push({
        stepImg: '',
        stepDetail: '',
      });
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
      display: flex;
      .form_left{
        flex: 4;
        .form_container{
          width: 100%;
          .form_item{
            width: 100%;
            .table_container{
              width: 95%;
              border: 1px solid #f5f5f8;
            }
          }
        }
      }
      .form_right{
        flex: 6;
        margin-left: 20px;
      }
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
    .submit_container{
      width: 100%;
      align-items: center;
      text-align: center;
      margin-top: 20px;
      .return{
        margin-left: 80px;
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

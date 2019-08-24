<template>
  <div>
    <div class="header">
      <BreadCrumb></BreadCrumb>
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
                  <el-select v-model="ruleForm.menuSort" placeholder="请选择">
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
                <el-form-item label="菜谱封面" prop="menuImgUrl">
                  <el-upload
                    class="avatar-uploader"
                    :action="host"
                    :show-file-list="false"
                    :on-success="handleMenuImgAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :data="uploadFile.data">
                    <div v-if="ruleForm.menuImgUrl" :style="'background:url('+/img/+ruleForm.menuImgUrl+'/360) center center / cover no-repeat;'" class="avatar"></div>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">上传一张最佳的效果图，有助于提高购买率</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜谱展示图" prop="menuShowImgUrl">
                  <el-upload
                    class="avatar-uploader"
                    :action="host"
                    :show-file-list="false"
                    :on-success="handleMenuShowAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :data="uploadFile.data">
                    <div v-if="ruleForm.menuShowImgUrl" :style="'background:url('+/img/+ruleForm.menuShowImgUrl+'/360) center center / cover no-repeat;'" class="avatar avatar_small"></div>
                    <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <el-form-item label="菜品原料" prop="materialData">
                  <div class="table_container">
                    <el-table
                      :data="ruleForm.materialData"
                      style="width: 100%"
                      :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                      <el-table-column prop="materialName" label="材料名" :align="'center'">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.materialName"
                                    placeholder="请输入材料名"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="materialAmount" label="用量" :align="'center'">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.materialAmount"
                                    placeholder="请输入用量"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" :align="'center'" prop="id">
                        <template slot-scope="scope">
                          <el-button type="danger" plain @click="deleteRow(scope.row.id)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <a href="#" style="color: rgb(64, 158, 255);" @click.prevent="addRow">
                    <div style="display: flex;justify-content: center;align-items: center;" class="add_row">加一行</div>
                  </a>
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
                    :data="ruleForm.menuStep"
                    style="width: 100%"
                    :show-header="false">
                    <el-table-column width="110" :align="'center'" prop="stepImg">
                      <template slot-scope="scope">
                        <el-upload
                          class="avatar-uploader"
                          :action="host"
                          :show-file-list="false"
                          :on-success="handleMenuStepAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                          :data="uploadFile.data">
                          <div v-if="scope.row.stepImg" :style="'background:url('+/img/+scope.row.stepImg+'/360) center center / cover no-repeat;'" class="avatar avatar_small"></div>
                          <i v-else class="el-icon-plus avatar-uploader-icon
                  avatar-uploader-icon_small" @click="findImgIdx(scope.row)"></i>
                        </el-upload>
                      </template>
                    </el-table-column>
                    <el-table-column width="200px" :align="'center'" prop="stepDetail">
                      <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.stepDetail"
                                  placeholder="请输入步骤详情" style="width: 100%"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column width="90" :align="'center'" prop="id">
                      <template slot-scope="scope">
                        <el-button type="danger" plain @click="deleteStep(scope.row.id)">删除</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column width="130" :align="'center'" prop="tagName">
                      <template slot-scope="scope">
                        <el-button type="default"
                                   plain @click="bindTags(scope.row.id)" v-if="scope.row.tagName === ''">绑定指令集</el-button>
                        <el-button type="default"
                                   plain @click="bindTags(scope.row.id)" v-else>指令集:{{scope.row.tagName}}</el-button>
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
                             plain @click="selectPanList">选择智能锅</el-button>
                  <div v-if="true" v-for="(item,index) in ruleForm.selectedPan" :key="index" style="margin-top: 10px;display: flex;align-items: center">
                    <div :style="'width:80px;height:80px;background:url('+/img/+item.cover+'/360) center center / cover no-repeat;'"></div>
                    <span :style="'margin: 0 20px 0 10px;'">{{item.name}}</span>
                    <el-button type="danger" plain @click="deletePan(index)">删除</el-button>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <el-dialog title="指令集选择" :visible.sync="dialogTagVisible">
          <el-form :model="tagsSelect">
            <div class="el_item">
              <el-input v-model="tagsSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="菜谱名称"></el-input>
              <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="tagsData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column prop="name" label="指令集名称" min-width="3">
                </el-table-column>
                <el-table-column label="操作" min-width="3" :align="'center'" prop="directiveSetId">
                  <template slot-scope="scope">
                    <a :href="'#'" style="color:#409eff;" @click.prevent="selectTags(scope.row.directiveSetId)">选择</a>
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
        <el-dialog title="商品选择" :visible.sync="dialogPanVisible">
          <el-form :model="goodsSelect">
            <div class="el_item">
              <el-input v-model="goodsSelect.searchName"
                        autocomplete="off" style="width: 200px;" placeholder="菜谱名称"></el-input>
              <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
            </div>
            <div class="el_item">
              <el-table
                :data="goodsData"
                style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
                <el-table-column label="商品封面" min-width="2" :align="'center'" prop="cover">
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
                    <a :href="'#'" style="color:#409eff;" @click.prevent="selectPan(scope.row.goodsId)">选择</a>
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
      </div>
      <div class="submit_container">
        <el-button type="primary" @click="saveMenu('ruleForm')">保存</el-button>
        <router-link to="/dashboard/operationManger/menuManage" active-class="return">
          <el-button type="default" plain>取消</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb';
export default {
  name: "EditMenu",
  data() {
    return {
      cookbook: null,
      ruleForm: {
        menuName: '',
        menuSort: '',
        menuImgUrl: '',
        menuShowImgUrl: '',
        flavorName: '',
        difficulty: '',
        useTime: '',
        materialData: [],
        tempMenuStep: null,
        menuStepIdx: 0,
        menuStep: [],
        menuDescription: '',
        selectedPan: [],
        isSelectedPan: false,
      },
      tagsSelect: {
        searchName: '',
      },
      goodsSelect: {
        searchName: '',
      },
      rules: {
        menuSort: [
          { required: true, message: '请选择商品种类', trigger: 'change' },
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
        menuImgUrl: [
          { required: true, message: '图片必须上传' },
        ],
        menuShowImgUrl: [
          { required: true, message: '图片必须上传' },
        ],
      },
      menuOptions: [
        {
          label: '营养早餐',
          options: [{
            value: '营养粥1',
            label: '营养粥1',
          }, {
            value: '营养粥2',
            label: '营养粥2',
          }],
        },
        {
          label: '老人餐',
          options: [{
            value: '老人素食',
            label: '老人素食',
          }, {
            value: '老人软食',
            label: '老人软食',
          }],
        },
        {
          label: '加班餐',
          options: [{
            value: '营养暖胃',
            label: '营养暖胃',
          }],
        },
        {
          label: '月子餐',
          options: [{
            value: '月子面',
            label: '月子面',
          }],
        }
      ],
      tagsData: [],
      goodsData: [],
      dialogPanVisible: false,
      dialogTagVisible: false,
      uploadFile: {},
      host: '',
      host_oos: 'img',
    };
  },
  methods: {
    saveMenu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.menuName);
          console.log(this.ruleForm.menuSort);
          console.log(this.ruleForm.menuImgUrl);
          console.log(this.ruleForm.menuShowImgUrl);
          console.log(this.ruleForm.materialData);
          console.log(this.ruleForm.flavorName);
          console.log(this.ruleForm.difficulty);
          console.log(this.ruleForm.useTime);
          console.log(this.ruleForm.menuStep);
          console.log(this.ruleForm.menuDescription);
          let materials = [];
          this.ruleForm.materialData.forEach((item) => {
            materials.push({
              "name": item.materialName,
              "info": item.materialAmount
            });
          });
          let steps = [];
          this.ruleForm.menuStep.forEach((item1, index) => {
            this.tagsData.forEach((item2) => {
              if (item2.name === item1.tagName) {
                steps.push({
                  "step": index+1,
                  "cover": item1.stepImg,
                  "video": "",
                  "images": [
                    item1.stepImg,
                  ],
                  "detail": item1.stepDetail,
                  "directiveSetId": item2.directiveSetId,
                });
              }
            });
          });
          let relativeGoodIds = [];
          this.ruleForm.selectedPan.forEach((item) => {
            relativeGoodIds.push(item.goodsId);
          });
          let cookCategoryIds = [];
          let promise = new Promise((resolve, reject) => {
            this.axios.get('api/cgi/m/cookbook/category/select').then((res) => {
              console.log(res.data.body);
              let cookCategoryName = '';
              this.menuOptions.forEach((item1) => {
                item1.options.forEach((item2) => {
                  if(item2.value === this.ruleForm.menuSort){
                    cookCategoryName = item1.label;
                  }
                });
              });
              if(cookCategoryName) {
                res.data.body.forEach((item) => {
                  if (item.name === cookCategoryName) {
                    cookCategoryIds.push(item.cookCategoryId);
                  }
                });
              }
              resolve(cookCategoryIds);
            }).catch((err) => {
              reject(err);
            });
          });
          promise.then((cookCategoryIds) => {
            this.axios.post('api/cgi/m/cookbook/revise',{
              "cookbookId": this.$route.params.cookbookId,
              "cookCategoryIds": cookCategoryIds,
              "name": this.ruleForm.menuName,
              "cover": this.ruleForm.menuImgUrl,
              "images": [
                this.ruleForm.menuShowImgUrl
              ],
              "description": this.ruleForm.menuDescription,
              "materials": materials,
              "features": [
                {
                  "name": "口味",
                  "info": this.ruleForm.flavorName
                },
                {
                  "name": "难度",
                  "info": this.ruleForm.difficulty
                },
                {
                  "name": "用时",
                  "info": this.ruleForm.useTime
                }
              ],
              "steps": steps,
              "relativeGoodIds": [],
              "sort": 1,
              "status": 1,
              "reAudit": false,
            }).then((res) => {
              console.log(res);
              this.$router.push('/dashboard/operationManger/menuManage');
              this.$message({
                message: '更新成功',
                type: 'success'
              });
            }).catch((err) => {
              console.log(err);
              this.$message.error('更新失败');
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addRow() {
      this.ruleForm.materialData.push({
        id: new Date().getTime(),
        materialName: '',
        materialAmount: '',
      });
    },
    deleteRow(id) {
      let idx = this.ruleForm.materialData.findIndex((item, index) => {
        return item.id === id;
      });
      this.ruleForm.materialData.splice(idx, 1);
    },
    handleMenuImgAvatarSuccess(res, file) {
      this.ruleForm.menuImgUrl = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
      console.log(this.ruleForm.menuImgUrl);
    },
    handleMenuShowAvatarSuccess(res, file) {
      this.ruleForm.menuShowImgUrl = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
      console.log(this.ruleForm.menuShowImgUrl);
    },
    handleMenuStepAvatarSuccess(res, file) {
      this.ruleForm.tempMenuStep.stepImg = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
      console.log(this.ruleForm.tempMenuStep.stepImg);
    },
    async beforeAvatarUpload(file) {
      const isValidate = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isValidate) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isValidate && isLt2M) {
        const result = await this.fsSignature(file);
        let data = result.data.body;
        this.uploadFile.data = {
          Filename: data.dir + '.' +
            (file.name.split('.')[1].replace('png', 'jpg') || file.name.split('.')[1].replace('jpeg', 'jpg')),
          key:
            data.dir + '.' +
            (file.name.split('.')[1].replace('png', 'jpg') || file.name.split('.')[1].replace('jpeg', 'jpg')),
          policy: data.policy,
          OSSAccessKeyId: data.accessid,
          success_action_status: "200",
          signature: data.signature,
        };
        this.host = data.host;
        return true;
      }
      else{
        return false;
      }
    },
    fsSignature(file) {
      return new Promise((resolve, reject) => {
        this.axios.get('api/cgi/store/imageOssToken?path=vendor').then((res) => {
          if(res.status === 200) {
            if(res.data.code === 200){
              resolve(res);
            }
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    addStep() {
      this.ruleForm.menuStep.push({
        id: new Date().getTime(),
        stepImg: '',
        stepDetail: '',
        tagName: '',
      });
    },
    deleteStep(id) {
      let idx = this.ruleForm.menuStep.findIndex((item, index) => {
        return item.id === id;
      });
      this.ruleForm.menuStep.splice(idx, 1);
    },
    bindTags(id) {
      this.axios.get('api/cgi/m/directiveSet/select').then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.tagsData = res.data.body.list;
            this.dialogTagVisible=true;
          }
        }
      });
      this.ruleForm.menuStepIdx = this.ruleForm.menuStep.findIndex((item, index) => {
        return item.id === id;
      });
    },
    selectTags(id) {
      let tag = this.tagsData.find((item, index) => {
        return item.directiveSetId === id;
      });
      this.ruleForm.menuStep[this.ruleForm.menuStepIdx].tagName = tag.name;
      this.dialogTagVisible = false;
    },
    selectPanList() {
      this.axios.get('api/cgi/m/goods/select').then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            this.goodsData = res.data.body.list;
            this.dialogPanVisible = true;
          }
        }
      });
    },
    selectPan(goodsId) {
      this.axios.get('api/cgi/m2/goods/detail?goodsId='+goodsId).then((res) => {
        if(res.status === 200) {
          if(res.data.code === 200) {
            console.log(res.data.body);
            this.ruleForm.selectedPan.push(res.data.body);
            this.ruleForm.isSelectPan = true;
            this.dialogPanVisible = false;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    deletePan(index) {
      console.log(index);
      this.ruleForm.selectedPan.splice(index, 1);
      if(this.ruleForm.selectedPan.length === 0) {
        this.ruleForm.isSelectedPan = false;
      }
    },
    findImgIdx(step) {
      this.ruleForm.tempMenuStep = step;
    },
  },
  mounted() {
    console.log(this.$route.params.cookbookId);
    let cookbookId = this.$route.params.cookbookId;
    this.axios.get('api/cgi/m/cookbook/detail?cookbookId='+cookbookId).then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          console.log(res.data.body);
          this.cookbook = res.data.body;
          this.ruleForm.menuName = this.cookbook.name;
          this.axios.get('api/cgi/m/cookbook/category/select').then((res) => {
            res.data.body.forEach((item1) => {
              if (item1.sort === this.cookbook.sort) {
                let idx = this.menuOptions.findIndex((item2) => {
                  return item2.label === item1.name;
                });
                this.ruleForm.menuSort = this.menuOptions[idx].options[0].value;
              }
            });
          }).catch((err) => {
            console.log(err);
          });
          this.ruleForm.menuImgUrl = this.cookbook.cover;
          this.ruleForm.menuShowImgUrl = this.cookbook.images[0];
          this.cookbook.materials.forEach((item) => {
            this.ruleForm.materialData.push({
              id: new Date().getTime(),
              materialName: item.name,
              materialAmount: item.info,
            },);
          });
          this.ruleForm.flavorName = this.cookbook.features[0].info;
          this.ruleForm.difficulty = this.cookbook.features[1].info;
          this.ruleForm.useTime = this.cookbook.features[2].info;
          this.cookbook.steps.forEach((item) => {
            this.ruleForm.menuStep.push({
              id: new Date().getTime(),
              stepImg: item.cover,
              stepDetail: item.detail,
              tagName: item.directiveSetInfo.name,
            });
          });
          this.ruleForm.menuDescription = this.cookbook.description;
        }
      }
    });
  },
  components: {
    BreadCrumb,
  }
}
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

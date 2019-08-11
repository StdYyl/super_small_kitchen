<template>
  <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          中央厨房管理</el-breadcrumb-item>
        <el-breadcrumb-item>中央厨房添加</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">中央厨房添加</p>
    </div>
    <div class="main">
      <div class="steps">
        <div class="step_item doing">
          <span>1.中央厨房信息</span>
          <div class="arrow">
            <div class="arrow_pre arrow_pre_doing">
            </div>
            <div :class="$store.state.addKitchenStepInfo.second.flag ?
            'arrow_next arrow_next_doing' : 'arrow_next'"></div>
          </div>
        </div>
        <div :class="$store.state.addKitchenStepInfo.second.flag ?
            'step_item doing' : 'step_item'">
          <span>2.负责人信息</span>
          <div class="arrow">
            <div :class="$store.state.addKitchenStepInfo.second.flag ?
            'arrow_pre arrow_pre_doing' : 'arrow_pre'">
            </div>
            <div :class="$store.state.addKitchenStepInfo.third.flag ?
            'arrow_next arrow_next_doing' : 'arrow_next'"></div>
          </div>
        </div>
        <div :class="$store.state.addKitchenStepInfo.third.flag ?
            'step_item doing' : 'step_item'">
          <span>3.账户信息</span>
          <div class="arrow">
            <div :class="$store.state.addKitchenStepInfo.third.flag ?
            'arrow_pre arrow_pre_doing' : 'arrow_pre'"></div>
            <div :class="$store.state.addKitchenStepInfo.fourth.flag ?
            'arrow_next arrow_next_doing' : 'arrow_next'"></div>
          </div>
        </div>
        <div :class="$store.state.addKitchenStepInfo.fourth.flag ?
            'step_item doing' : 'step_item'">
          <span>4.添加成功</span>
          <div class="arrow">
            <div :class="$store.state.addKitchenStepInfo.fourth.flag ?
            'arrow_pre arrow_pre_doing' : 'arrow_pre'"></div>
          </div>
        </div>
      </div>
      <div class="step_first" v-if="step_num===1">
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="中央厨房名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请填写中央厨房名称"></el-input>
            </el-form-item>
            <el-form-item label="中央厨房logo" prop="imgLogo">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageLogoUrl" :src="imageLogoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="中央厨房类型" required>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="中央厨房简称" prop="simpleName">
              <el-input v-model="ruleForm.simpleName" placeholder="请填写中央厨房简称"></el-input>
            </el-form-item>
            <el-form-item label="中央厨房介绍" prop="introduction">
              <el-input type="textarea" v-model="ruleForm.introduction"
                        placeholder="请填写中央厨房介绍"></el-input>
            </el-form-item>
            <el-form-item label="中央厨房描述" prop="description">
              <el-input type="textarea" v-model="ruleForm.description"
                        placeholder="请填写中央厨房描述"></el-input>
            </el-form-item>
            <div style="display: flex;">
              <el-form-item label="省/市/区">
                <el-cascader :options="CityInfo" v-model="$store.state.city">
                  <template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" prop="detail_address">
                <el-input v-model="detail_address" placeholder="请填写详细地址"></el-input>
              </el-form-item>
              <el-form-item class="toolbar">
                <el-button type="primary"
                           @click="changeLocation($store.state.city)">查看并确认</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <div class="amap-page-container">
                <el-amap ref="map" vid="amap"
                         :center="center" :zoom="zoom" :plugin="plugin"
                         :events="events" class="amap">
                  <el-amap-marker :position="center"
                                  :visible="true" :draggable="false"></el-amap-marker>
                  <el-amap-marker :position="center" :content="location_content"
                                  :visible="true" :draggable="false"></el-amap-marker>
                </el-amap>
                <div class="toolbar">
                  <span v-if="loaded">
                    location: lng = {{ lng }} lat = {{ lat }}
                  </span>
                  <span v-else>
                    正在定位
                  </span>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div style="display: flex;justify-content: center;align-items: center">
                <el-button type="primary" @click="nextStep(2)">下一步</el-button>
                <router-link to="/dashboard/cooperationManger/centralKitchenManage">
                  <el-button>返回</el-button>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="step_first" v-if="step_num===2">
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="负责人姓名" prop="chargeName">
              <el-input v-model="ruleForm.chargeName" placeholder="请填写负责人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="chargeTel">
              <el-input v-model="ruleForm.chargeTel" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="chargeCardNum">
              <el-input v-model="ruleForm.chargeCardNum" placeholder="请填写身份证号"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照" prop="cardFront">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageCardFrontUrl" :src="imageCardFrontUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面照" prop="cardBack">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageCardEndUrl" :src="imageCardEndUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <div style="display: flex;justify-content: center;align-items: center">
                <el-button type="primary" @click="nextStep(3)">下一步</el-button>
                <el-button @click="priorStep(1)">返回</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="step_first" v-if="step_num===3">
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="营业执照号" prop="businessLicenseId">
              <el-input v-model="ruleForm.businessLicenseId" placeholder="请填写营业执照号"></el-input>
            </el-form-item>
            <el-form-item label="营业执照照片" prop="businessLicenseImg">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="businessLicenseImg" :src="businessLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="卫生许可证号" prop="hygieneLicenseId">
              <el-input v-model="ruleForm.hygieneLicenseId" placeholder="请填写卫生许可证号"></el-input>
            </el-form-item>
            <el-form-item label="卫生许可证照片" prop="hygieneLicenseImg">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="hygieneLicenseImg" :src="hygieneLicenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="支付宝账号" prop="alipayId">
              <el-input v-model="ruleForm.alipayId" placeholder="请填写支付宝账号"></el-input>
            </el-form-item>
            <el-form-item label="转账银行信息" prop="transferBank">
              <el-input v-model="ruleForm.transferBank" placeholder="请填写转账银行信息"></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="bankId">
                <el-input v-model="ruleForm.bankId" placeholder="请填写银行账号"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="openingBank">
              <el-input v-model="ruleForm.openingBank" placeholder="请填写开户行"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input v-model="ruleForm.note" placeholder="请填写备注"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="display: flex;justify-content: center;align-items: center">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                <el-button @click="priorStep(2)">返回</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import AMap from 'vue-amap';

Vue.use(AMap);
const amapManager = new AMap.AMapManager();
export default {
  name: 'AddStore',
  data() {
    const self = this;
    return {
      ruleForm: {
        name: '',
        type: [],
        detail_address: '',
        simpleName: '',
        introduction: '',
        description: '',
        chargeName: '',
        chargeTel: '',
        chargeCardNum: '',
        businessLicenseId: '',
        hygieneLicenseId: '',
        alipayId: '',
        transferBank: '',
        bankId: '',
        openingBank: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入中央厨房名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        simpleName: [
          { required: true, message: '请输入中央厨房简称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        introduction: [
          { required: true, message: '请输入中央厨房介绍', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入中央厨房描述', trigger: 'blur' },
        ],
        imgLogo: [
          { required: true, message: '必须上传照片', trigger: 'blur' },
        ],
        chargeName: [
          { required: true, message: '请输入负责人名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        chargeTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在必须为11位', trigger: 'blur' },
        ],
        chargeCardNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在必须为18位', trigger: 'blur' },
        ],
        cardFront: [
          { required: true, message: '必须上传照片', trigger: 'blur' },
        ],
        cardBack: [
          { required: true, message: '必须上传照片', trigger: 'blur' },
        ],
        businessLicenseId: [
          { required: true, message: '请输入营业执照号', trigger: 'blur' },
        ],

        businessLicenseImg: [
          { required: true, message: '必须上传照片', trigger: 'blur' },
        ],
        hygieneLicenseId: [
          { required: true, message: '请输入卫生许可证号', trigger: 'blur' },
        ],
        hygieneLicenseImg: [
          { required: true, message: '必须上传照片', trigger: 'blur' },
        ],
        alipayId: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' },
        ],
        transferBank: [
          { required: true, message: '请输入转账银行信息', trigger: 'blur' },
        ],
        bankId: [
          { required: true, message: '请输入银行账号', trigger: 'blur' },
        ],
        openingBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' },
        ],
      },
      imageLogoUrl: '',
      imageCardFrontUrl: '',
      imageCardEndUrl: '',
      businessLicenseImg: '',
      hygieneLicenseImg: '',
      options: [{
        value: '选项1',
        label: '自营',
      }, {
        value: '选项2',
        label: '非自营',
      }],
      value: '',
      detail_address: '',
      location: '',
      location_content: '',
      CityInfo: [],
      zoom: 12,
      amapManager,
      lng: 0,
      lat: 0,
      loaded: false,
      center: [121.59996, 31.197646],
      events: {
        init: (o) => {
          // console.log(o.getCenter())
          // console.log(this.$refs.map.$$getInstance())
          // o.getCity((result) => {
          //   // console.log(result);
          //   self.location_content = result.province + result.district;
          // });
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          console.log(e);
        },
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
      }, {
        pName: 'Geolocation',
        events: {
          init(o) {
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.location_content = result.formattedAddress;
                self.$nextTick();
                var province = '', city = '', district = '', street_number = '';
                self.axios.get('api/cgi/map/locationToAddress?latitude=' + self.lat + '&longitude=' + self.lng).then((res) => {
                  console.log(res.data);
                  province = res.data.body.address_component.province;
                  city = res.data.body.address_component.city;
                  district = res.data.body.address_component.district;
                  street_number = res.data.body.address_component.street_number;

                  self.CityInfo.forEach((item1) => {
                    if (item1.label === province && item1.children) {
                      item1.children.forEach((item2) => {
                        if (item2.label === city) {
                          if (item2.children) {
                            item2.children.forEach((item3) => {
                              if (item3.label === district) {
                                self.$store.dispatch('change_pos', [item1.value, item2.value, item3.value]);
                                self.detail_address = street_number;
                              }
                            });
                          }
                        }
                      });
                    }
                  });
                });
              }
            });
          },
        },
      }],
      step_num: 1,
    };
  },
  created() {
    this.axios.get('api/cgi/map/getDistrictTree').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 200) {
          this.CityInfo = res.data.body;
        }
      }
    });
  },
  mounted() {
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
    changeLocation(value) {
      // this.$store.dispatch('change_pos', [value[0], value[1]]);
      this.CityInfo.forEach((item1) => {
        if (item1.value === value[0] && item1.children) {
          item1.children.forEach((item2) => {
            if (item2.value === value[1]) {
              if (item2.children) {
                item2.children.forEach((item3) => {
                  if (item3.value === value[2]) {
                    this.location =
                      item1.label + item2.label + item3.label + this.detail_address;
                  }
                });
              } else {
                this.location = item1.label + item2.label + this.detail_address;
              }
            }
          });
        }
      });
      this.location_content = this.location;
      // 'https://restapi.amap.com/v3/geocode/geo?address=' + this.location + '&output=JSON&key=0728f7d760eab59115f64adca8a813e8'
      this.axios.get('https://restapi.amap.com/v3/geocode/geo?address=' + this.location + '&output=JSON&key=0728f7d760eab59115f64adca8a813e8')
        .then((res) => {
          console.log(res);
          this.lng = res.data.geocodes[0].location.split(',')[0];
          this.lat = res.data.geocodes[0].location.split(',')[1];
          this.center = [this.lng, this.lat];
        });
    },
    nextStep(value) {
      this.step_num = value;
      this.$store.dispatch('next', value);
    },
    priorStep(value) {
      this.step_num = value;
      this.$store.dispatch('prior', value + 1);
    },
  },
  filters: {
  },
  watch: {},
  computed: {},
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
  }
  .steps{
    margin-bottom: 50px;
    display: flex;
  }
  .step_item{
    position: relative;
    flex: 1;
    height: 30px;
    background-color: #eee;
    font: normal normal 14px/30px '微软雅黑';
    text-align: center;
  }
  .arrow{
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    background-color: #fff;
  }
  .arrow>div{
    border-left: 15px solid transparent;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  .arrow .arrow_pre{
    border-left: 15px solid #eee;
  }
  .arrow .arrow_next{
    border-top: 15px solid #eee;
    border-bottom: 15px solid #eee;
  }
  .doing{
    color: #fff;
    background-color: #6698ff;
  }
  .arrow .arrow_pre_doing{
    border-left: 15px solid #6698ff;
  }
  .arrow .arrow_next_doing{
    border-top: 15px solid #6698ff;
    border-bottom: 15px solid #6698ff;
  }
  .form{
    padding: 0 80px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .amap {
    height: 300px;
  }
  .amap-page-container{
    position: relative;
  }
  .router-link-active{
    margin-left: 10px;
  }
</style>

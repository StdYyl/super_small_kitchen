<template>
  <div>
    <div class="header">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="main">
      <div class="step_first">
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="中央厨房名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请填写中央厨房名称"></el-input>
            </el-form-item>
            <el-form-item label="中央厨房logo" prop="imageLogoUrl" ref="uploadElement">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleLogoAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadFile.data">
                <div v-if="ruleForm.imageLogoUrl" :style="'background:url('+/img/+ruleForm.imageLogoUrl+'/360) center center / cover no-repeat;'" class="avatar"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="中央厨房类型" required prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择">
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
            <el-form-item label="负责人姓名" prop="chargeName">
              <el-input v-model="ruleForm.chargeName" placeholder="请填写负责人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="chargeTel">
              <el-input v-model="ruleForm.chargeTel" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="chargeId">
              <el-input v-model="ruleForm.chargeId" placeholder="请填写身份证号"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照" prop="imageCardFrontUrl">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleCardFrontAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadFile.data">
                <div v-if="ruleForm.imageCardFrontUrl" :style="'background:url('+/img/+ruleForm.imageCardFrontUrl+'/360) center center / cover no-repeat;'" class="avatar"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面照" prop="imageCardEndUrl">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleCardEndAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadFile.data">
                <div v-if="ruleForm.imageCardEndUrl" :style="'background:url('+/img/+ruleForm.imageCardEndUrl+'/360) center center / cover no-repeat;'" class="avatar"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="营业执照号" prop="businessLicenseId">
              <el-input v-model="ruleForm.businessLicenseId" placeholder="请填写营业执照号"></el-input>
            </el-form-item>
            <el-form-item label="营业执照照片" prop="businessLicenseImg">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleBusinessLicenseAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadFile.data">
                <div v-if="ruleForm.businessLicenseImg" :style="'background:url('+/img/+ruleForm.businessLicenseImg+'/360) center center / cover no-repeat;'" class="avatar"></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="卫生许可证号" prop="hygieneLicenseId">
              <el-input v-model="ruleForm.hygieneLicenseId" placeholder="请填写卫生许可证号"></el-input>
            </el-form-item>
            <el-form-item label="卫生许可证照片" prop="hygieneLicenseImg">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleHygieneLicenseAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadFile.data">
                <div v-if="ruleForm.hygieneLicenseImg" :style="'background:url('+/img/+ruleForm.hygieneLicenseImg+'/360) center center / cover no-repeat;'" class="avatar"></div>
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
                <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
                <router-link to="/dashboard/cooperationManger/centralKitchenManage">
                  <el-button>返回</el-button>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb';
import Vue from 'vue';
// 地图插件
import AMap from 'vue-amap';
import {fetch, post} from "../../api/http";

Vue.use(AMap);
AMap.initAMapApiLoader({
  // 高德的key
  key: 'c23a73bb2c062de16b9158396b2817de&plugin=AMap.Geocoder',
  // 插件集合
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'AMap.CitySearch',
  ],
  v: '1.4.4',
});
const amapManager = new AMap.AMapManager();
export default {
  name: "EditStore",
  data() {
    const self = this;
    return {
      vendor: null,
      ruleForm: {
        name: '',
        imageLogoUrl: '',
        type: '',
        detail_address: '',
        simpleName: '',
        introduction: '',
        description: '',
        chargeName: '',
        chargeTel: '',
        chargeId: '',
        imageCardFrontUrl: '',
        imageCardEndUrl: '',
        businessLicenseId: '',
        businessLicenseImg: '',
        hygieneLicenseId: '',
        hygieneLicenseImg: '',
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
        type: [
          { required: true, message: '必须选择类型', trigger: 'blur' },
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
        imageLogoUrl: [
          { required: true, message: '必须上传照片', trigger: 'change' },
        ],
        chargeName: [
          { required: true, message: '请输入负责人名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        chargeTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在必须为11位', trigger: 'blur' },
        ],
        chargeId: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在必须为18位', trigger: 'blur' },
        ],
        imageCardFrontUrl: [
          { required: true, message: '必须上传照片' },
        ],
        imageCardEndUrl: [
          { required: true, message: '必须上传照片' },
        ],
        businessLicenseId: [
          { required: true, message: '请输入营业执照号', trigger: 'blur' },
        ],

        businessLicenseImg: [
          { required: true, message: '必须上传照片' },
        ],
        hygieneLicenseId: [
          { required: true, message: '请输入卫生许可证号', trigger: 'blur' },
        ],
        hygieneLicenseImg: [
          { required: true, message: '必须上传照片' },
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
      options: [
        {
          value: 'self',
          label: '自营',
        }, {
          value: 'partner',
          label: '非自营',
        }, {
          value: 'chain',
          label: '连锁',
        }
      ],
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
        init: (o) => {},
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

            });
          },
        },
      }],
      uploadFile: {},
      host: '',
      host_oos: 'img',
    };
  },
  created() {
    fetch('api/cgi/map/getDistrictTree').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 200) {
          this.CityInfo = res.data.body;
        }
      }
    });
  },
  mounted() {
    let vendorId = this.$route.params.vendorId;
    fetch('api/cgi/m0/vendor/detail',{
      "vendorId": vendorId,
    }).then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.vendor = res.data.body;
          console.log(this.vendor);
          this.location = this.vendor.address;
          this.ruleForm.name = this.vendor.name;
          this.ruleForm.imageLogoUrl = this.vendor.cover;
          this.ruleForm.type = this.vendor.type;
          this.ruleForm.simpleName = this.vendor.shortName;
          this.ruleForm.introduction = this.vendor.introduction;
          this.ruleForm.description = this.vendor.description;
          this.ruleForm.chargeName = this.vendor.ownerName;
          this.ruleForm.chargeTel = this.vendor.ownerMobile;
          this.ruleForm.chargeId = this.vendor.ownerCardNo;
          this.ruleForm.imageCardFrontUrl = this.vendor.ownerCardCopyA;
          this.ruleForm.imageCardEndUrl = this.vendor.ownerCardCopyB;
          this.ruleForm.businessLicenseId = this.vendor.licenseNo;
          this.ruleForm.businessLicenseImg = this.vendor.licenseCopy;
          this.ruleForm.hygieneLicenseId = this.vendor.hygieneLicenseNo;
          this.ruleForm.hygieneLicenseImg = this.vendor.hygieneLicenseCopy;
          this.ruleForm.alipayId = this.vendor.alipayNo;
          this.ruleForm.transferBank = this.vendor.bankCardName;
          this.ruleForm.bankId = this.vendor.bankCardNo;
          this.ruleForm.openingBank = this.vendor.bankOfDeposit;
        }
      }
    }).then(() => {
      fetch('https://restapi.amap.com/v3/geocode/geo',{
        "address": this.vendor.address,
        "output": 'JSON',
        "key": '0728f7d760eab59115f64adca8a813e8',
      }).then((res) => {
        this.lng = res.data.geocodes[0].location.split(',')[0];
        this.lat = res.data.geocodes[0].location.split(',')[1];
        this.center = [this.lng, this.lat];

        var province = '', city = '', district = '', street_number = '';
        province = this.vendor.province;
        city = this.vendor.city;
        district = this.vendor.district;
        street_number = this.vendor.streetNumber;
        this.CityInfo.forEach((item1) => {
          if (item1.label === province && item1.children) {
            item1.children.forEach((item2) => {
              if (item2.label === city) {
                if (item2.children) {
                  item2.children.forEach((item3) => {
                    if (item3.label === district) {
                      this.$store.dispatch('change_pos', [item1.value, item2.value, item3.value]);
                      this.detail_address = street_number;
                    }
                  });
                }
              }
            });
          }
        });
      });
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('api/cgi/m0/vendor/revise', {
            "vendorId": this.$route.params.vendorId,
            "name": this.ruleForm.name,
            "shortName": this.ruleForm.simpleName,
            "cover": this.ruleForm.imageLogoUrl,
            "type": this.ruleForm.type,
            "images": [],
            "description": this.ruleForm.description,
            "introduction": this.ruleForm.introduction,
            "longitude": this.lng,
            "latitude": this.lat,
            "ownerName": this.ruleForm.chargeName,
            "ownerCardNo": this.ruleForm.chargeId,
            "ownerCardCopyA": this.ruleForm.imageCardFrontUrl,
            "ownerCardCopyB": this.ruleForm.imageCardEndUrl,
            "ownerMobile": this.ruleForm.chargeTel,
            "licenseNo": this.ruleForm.businessLicenseId,
            "licenseCopy": this.ruleForm.businessLicenseImg,
            "hygieneLicenseNo": this.ruleForm.hygieneLicenseId,
            "hygieneLicenseCopy": this.ruleForm.hygieneLicenseImg,
            "alipayNo": this.ruleForm.alipayId,
            "bankCardName": this.ruleForm.transferBank,
            "bankCardNo": this.ruleForm.bankId,
            "bankOfDeposit": this.ruleForm.openingBank,
            "remark": this.ruleForm.note,
            "status": 1
          }).then((res) => {
            if(res.status === 200) {
              if(res.data.code === 200) {
                console.log(res);
                this.$router.push('/dashboard/cooperationManger/centralKitchenManage');
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
              }
            }
          }, (err) => {
            console.log(err);
            this.$message.error('更新失败');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleLogoAvatarSuccess(res, file) {
      this.ruleForm.imageLogoUrl = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
    },
    handleCardFrontAvatarSuccess(res, file) {
      this.ruleForm.imageCardFrontUrl = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
    },
    handleCardEndAvatarSuccess(res, file) {
      this.ruleForm.imageCardEndUrl = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
    },
    handleBusinessLicenseAvatarSuccess(res, file) {
      this.ruleForm.businessLicenseImg = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
    },
    handleHygieneLicenseAvatarSuccess(res, file) {
      this.ruleForm.hygieneLicenseImg = this.uploadFile.data.key;
      this.uploadFile = {};
      this.host = '';
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
      return fetch('api/cgi/store/imageOssToken',{
        "path": 'vendor'
      });
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
      fetch('https://restapi.amap.com/v3/geocode/geo',{
        "address": this.location,
        "output": 'JSON',
        "key": '0728f7d760eab59115f64adca8a813e8'
      }).then((res) => {
        console.log(res);
        this.lng = res.data.geocodes[0].location.split(',')[0];
        this.lat = res.data.geocodes[0].location.split(',')[1];
        this.center = [this.lng, this.lat];
      });
    },
  },
  components: {
    BreadCrumb,
  },
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
    padding: 23px 30px 30px;
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
  .success_container{
    padding: 0 100px;
  }
  .content{
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 100px;
      height: 100px;
    }
    .success_title{
      font: normal 700 24px/30px '微软雅黑';
      margin: 20px 0;
    }
    .success_note{
      font: normal 400 16px/18px '微软雅黑';
      margin: 0 0 20px;
      color: #999;
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


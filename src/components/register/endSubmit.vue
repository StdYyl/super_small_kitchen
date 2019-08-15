<template>
  <div class="endSub">
<!--    内容1-->
    <el-form-item label="中央厨房信息" style="font-weight: 700;"></el-form-item>
    <el-form-item label="中央厨房名称" class="remove">
      <el-input v-model="registerForm.name" readonly></el-input>
    </el-form-item>
    <el-form-item label="中央厨房logo" class="remove">
      <img :src="registerForm.cover" style="width: 82px;height: 82px;padding-left: 15px">
    </el-form-item>
    <el-form-item label="中央厨房简称" class="remove">
      <el-input v-model="registerForm.shortName" readonly></el-input>
    </el-form-item>
    <el-form-item label="中央厨房介绍" class="remove">
      <el-input v-model="registerForm.introduction" readonly></el-input>
    </el-form-item>
    <el-form-item label="中央厨房描述" class="remove">
      <el-input v-model="registerForm.description" readonly></el-input>
    </el-form-item>
    <el-form-item label="省市区" class="remove">
      <el-input v-model="address" readonly></el-input>
    </el-form-item>
    <el-form-item label="详细地址" class="remove">
      <el-input v-model="addressDetails" readonly></el-input>
    </el-form-item>
    <el-form-item label="详细地址" class="remove">
      <div id="container"></div>
      <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no"
              src="https://apis.map.qq.com/tools/geolocation?key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4&referer=超小厨-web">
      </iframe>
    </el-form-item>
    <el-divider></el-divider>
<!--    内容二-->
    <el-form-item label="负责人信息" style="font-weight: 700;"></el-form-item>
    <el-form-item label="负责人姓名" class="remove">
      <el-input v-model="registerForm.ownerName" readonly></el-input>
    </el-form-item>
    <el-form-item label="联系电话" class="remove">
      <el-input v-model="registerForm.ownerMobile" readonly></el-input>
    </el-form-item>
    <el-form-item label="身份证号" class="remove">
      <el-input v-model="registerForm.ownerCardNo" readonly></el-input>
    </el-form-item>
    <el-form-item label="身份证正面照" class="remove">
      <img :src="registerForm.ownerCardCopyA" style="width: 180px;height: 116px;padding-left: 15px">
    </el-form-item>
    <el-form-item label="身份证反面照" class="remove">
      <img :src="registerForm.ownerCardCopyB" style="width: 180px;height: 116px;padding-left: 15px">
    </el-form-item>
    <el-divider></el-divider>
<!--    内容三-->
    <el-form-item label="主体信息" style="font-weight: 700;"></el-form-item>
    <el-form-item label="营业执照号" class="remove">
      <el-input v-model="registerForm.licenseNo" readonly></el-input>
    </el-form-item>
    <el-form-item label="营业执照号照片" class="remove">
      <img :src="registerForm.licenseCopy" style="width: 180px;height: 116px;padding-left: 15px">
    </el-form-item>
    <el-form-item label="卫生许可证号" class="remove">
      <el-input v-model="registerForm.hygieneLicenseNo" readonly></el-input>
    </el-form-item>
    <el-form-item label="卫生许可证照片" class="remove">
      <img :src="registerForm.hygieneLicenseCopy" style="width: 180px;height: 116px;padding-left: 15px">
    </el-form-item>
    <el-form-item label="支付宝账号" class="remove">
      <el-input v-model="registerForm.alipayNo" readonly></el-input>
    </el-form-item>
    <el-form-item label="转账银行信息" class="remove">
      <el-input v-model="registerForm.bankCardName" readonly></el-input>
    </el-form-item>
    <el-form-item label="银行账号" class="remove">
      <el-input v-model="registerForm.bankCardNo" readonly></el-input>
    </el-form-item>
    <el-form-item label="开户行" class="remove">
      <el-input v-model="registerForm.bankOfDeposit" readonly></el-input>
    </el-form-item>
    <el-form-item label="备注" class="remove">
      <el-input v-model="registerForm.remark" readonly></el-input>
    </el-form-item>
    <el-divider></el-divider>

  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {locationToAddress} from '@/api/map'

    export default {
        name: "endSubmit",
        data() {
            return {
                address: '',
                addressDetails: '',
            }
        },
        methods: {
            init() {
                let center = new qq.maps.LatLng(this.registerForm.latitude, this.registerForm.longitude)
                let map = new qq.maps.Map(document.getElementById("container"), {
                    center: center,
                    zoom: 13
                });
                let info = new qq.maps.InfoWindow({
                    map: map
                });
                info.open();
                info.setContent('<div style="width:200px;height:70px;line-height: normal;font-weight: normal">' +
                    this.addressDetails + '</div>');
                info.setPosition(map.getCenter());

                let mark = new qq.maps.Marker({
                    position: center,
                    map: map
                })
            },
        },
        async mounted() {

            let rs = await locationToAddress(this.registerForm.latitude, this.registerForm.longitude);
            this.address = rs['ad_info'].province + " " + rs['ad_info'].city + " " + rs['ad_info'].district
            this.addressDetails = rs['ad_info'].nation + rs.address
            this.init();
        },
        computed: {
            ...mapState(['registerForm'])
        }
    }
</script>

<style>
  #container {
    width: 500px;
    height: 400px;
  }

  .endSub div.remove {
    margin: 0 0 5px 113px;
    text-align: left;

  }

  .remove input.el-input__inner {
    border: 0px;
  }

  .remove input.el-input__inner:hover {
    cursor: default;
  }


</style>

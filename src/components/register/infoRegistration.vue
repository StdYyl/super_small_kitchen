<template>
  <div>

    <el-form-item label="中央厨房名称" prop="name">
      <el-input v-model="registerForm.name" placeholder="请填写中央厨房名称"></el-input>
    </el-form-item>
    <el-form-item label="中央厨房logo" prop="cover">
      <el-upload
        class="avatar-uploader"
        ref="uploadxls"
        action="aaa"
        :show-file-list="false"
        :model="registerForm.cover"
        :on-change="handleImg"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :before-upload="beforeUpLoad">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="tips">
        <p class="alerts">建议照片尺寸为240px*240px</p>
      </div>

    </el-form-item>
    <el-form-item label="中央厨房简称" prop="shortName">
      <el-input v-model="registerForm.shortName" placeholder="请填写中央厨房名称"></el-input>
      <div class="tips">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABF0lEQVQ4T2NkQAKrVv1nfvDrsyczE6M/w39GN7AU4/9df//936jAxrs9LIzxL0w5I4zRtfSjKhMD81JGRgZTZMNg7P//GU7/Y/gbXRbNfxtsHojoW/xR5T8z0xEGBkZxuKb/DFsgNjL4IAz6/5Lx7z+bolj+O4yhq/4zW/z+eoyBkcEM2aZ///4FgfhMTEzrUFzwn+HUCVZuK8auJZ98mJmYNqM7j5ERovH/fzSNDAwMf//982XsXfplDgMjQzIpGhn+M8xl7Fn2+SkjA6MUKRr/M/x/Rr5GXE799/9/JDhwGBmXY0QPyKm4Auf/f4a34NhgZBBG1wgOHDzRkQaNjllYowNnAmBgqIJqaMOaAChKcjDNpCRyAOURmoHpK9FuAAAAAElFTkSuQmCC"/>
        <p class="alerts">建议25个字以内</p>
      </div>
    </el-form-item>
    <el-form-item label="中央厨房介绍" prop="introduction">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请填写简介"
        v-model="registerForm.introduction" style="width: 380px">
      </el-input>
    </el-form-item>
    <el-form-item label="中央厨房描述" prop="description">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请填写描述"
        v-model="registerForm.description" style="width: 380px">
      </el-input>
    </el-form-item>
    <div class="address">
      <el-form-item label="省/市/区">
        <el-cascader
          :options="areaJson"
          v-model="workArea"
          @change="handleChange"
          style="width: 260px"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" label-width="100px" style="margin-left: 0px">
        <el-input v-model="address" style="width: 260px;margin-right: 10px" placeholder="详细地址（不包含省市区）"></el-input>
      </el-form-item>
      <el-button type="primary" style="height: 40px" @click="changeLocation">查看并确认</el-button>
    </div>

    <el-form-item>
      <div id="container"></div>
      <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no"
              src="https://apis.map.qq.com/tools/geolocation?key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4&referer=超小厨-web">
      </iframe>
    </el-form-item>
<!--    <remoteJs :url="'https://map.qq.com/api/js?v=2.exp&key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4'"></remoteJs>-->
<!--    <remoteJs :url="'https://apis.map.qq.com/tools/geolocation/min?key=37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4&referer=超小厨-web'"></remoteJs>-->
  </div>
</template>


<script>

  import { mapState } from 'vuex';
  import { getDistrictList, getCityList, locationToAddress, } from '@/api/map';
  // import remoteJs from '@/basical/component/mapS';

  let map,
    center,
    info,
    mark;
  export default {
    name: 'infoRegistration',
    // components: {
    //   remoteJs,
    // },
    data() {
      return {
        areaJson: [],
        workArea: [],
        workAreaed: '',
        imageUrl: '',
        lat: 0,
        lng: 0,
        address: '',
      };
    },
    methods: {
      // 阻止图片上传到后台
      beforeUpLoad() {
        this.registerForm.cover = this.imageUrl;
        return false;
      },
      // 获取上传图片的地址
      handleImg(file, files) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 地图初始化
      async init() {
        await this.getLoaction();

        map = new qq.maps.Map(document.getElementById('container'), {
          zoom: 13,
        });
        this.getMap();
        // 绑定单击事件添加参数
        qq.maps.event.addListener(map, 'click', (event) => {
          info.close();
          mark.setVisible(false);
          this.lat = event.latLng.getLat();
          this.lng = event.latLng.getLng();
          this.getMap();
        });
      },
      //  修改map
      async getMap() {
        let that = this;
        center = new qq.maps.LatLng(this.lat, this.lng);
        map.setCenter(center);
        this.registerForm.latitude = this.lat;
        this.registerForm.longitude = this.lng;
        // 将经纬度转换成对应的地址
        let geocoder = new qq.maps.Geocoder();
        geocoder.getAddress(center);
        await geocoder.setComplete(result => {
          this.workArea = [];
          if (result) {
            let loc = result.detail.addressComponents;
            // 地址提示窗口
            info = new qq.maps.InfoWindow({
              map,
            });
            info.open();
            // 获取省、市、县和详细地址
            this.areaJson.filter(item => {
              if (item.label == loc.province) {
                that.workArea.splice(0, 0, item.value);
                item.children.filter(itemed => {
                  if (itemed.label == loc.city) {
                    that.workArea.splice(1, 1, itemed.value);
                    itemed.children.filter(end => {
                      if (end.label == loc.district) {
                        //详细地址
                        let id = result.detail.address.indexOf(loc.district);
                        this.address = result.detail.address.substring(id + loc.district.length);
                        that.workArea.splice(2, 2, end.value);
                      }
                    });
                  }
                });
              }
            });
            info.setContent(`<div style="width:200px;height:70px;line-height: normal;font-weight: normal">${
              result.detail.address}</div>`);
            info.setPosition(result.detail.location);
          } else {
            return;
          }
        });
        mark = new qq.maps.Marker({
          position: center,
          map,
        });

      },

      // 地址改变  将code转换为地址
      handleChange(e) {
        console.log(e);
        // 省
        this.areaJson.filter((item, index) => {
          if (item.value == e[0]) {
            this.workAreaed += item.label;
            // 市
            item.children.filter((items, indexed) => {
              if (items.value == e[1]) {
                this.workAreaed += items.label;
                // 县
                if (e.length == 3) {
                  items.children.filter((itemed) => {
                    this.workAreaed += itemed.value == e[2] ? itemed.label : '';
                  });
                }
              }
            });
          }
        });
      },
      // 将详细地址转换为 经纬度
      changeLocation() {
        //   获取位置的经纬度
        let that = this;
        let geocoder = new qq.maps.Geocoder();
        geocoder.getLocation(this.workAreaed + this.address);
        geocoder.setComplete((res) => {
          this.lat = res.detail.location.lat;
          this.lng = res.detail.location.lng;
          info.close();
          mark.setVisible(false);
          this.getMap(that);
        });
      },
      // 获取用户地理位置的经纬度
      getLoaction(that) {
        const geolocation = new qq.maps.Geolocation('37HBZ-AZPC6-PWNSB-MQHVE-F5QZO-MYBH4', '超小厨-web');
        geolocation.getIpLocation((position) => {
          this.lat = position.lat;
          this.lng = position.lng;
        }, (err) => {
          console.log(`地理位置获取失败！${err}`);
        });
      },

    },
    async mounted() {

      this.imageUrl = this.registerForm.cover;
      this.areaJson = await getDistrictList();
      this.init();

    },

    computed: {
      ...mapState(['registerForm']),
    },
  };
</script>

<style scoped>
  #container {
    width: 500px;
    height: 400px;
  }

  .address {
    display: flex;
  }

  .el-form-item {
    font-weight: 700;
    text-align: left;
    margin-left: 100px;
  }

  .el-input {
    width: 260px;
  }

  .alerts {
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    margin-left: 3px;
    color: #666;
  }

  .tips {
    height: 25px;
    display: flex;
    align-items: flex-end;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader:hover {
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

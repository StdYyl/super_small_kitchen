<template>
  <div class="nav">
    <div class="nav_top">
      <div class="icon_bd">
        <ul>
          <li v-for="(item,id) in ls">
            <div :class="index[id+1]>=0?'line line_on':'line'">
            </div><div class="icond">
              <div class="icons" :style="(id+1)==ls.length?'left:10px;width:70px':''">
                <div :class=" (id+1)==index.length?'ic ic_on':'ic'"
                     :style="index[id]>=0?'background:#6698ff':''"></div>
              </div>
              <span :style="(id+1)==ls.length?'left:-35px':''">{{id+1}}.{{item}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'registerNav',
  props:['index'],
  data() {
    return {
      ls:['基本信息', '信息登记', '信息负责人', '主体信息', '提交审核']
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    display: flex;
    flex: 1;
    margin-left: 20px;
  }
  li{
    width: 200px;
    position: relative;
  }
  .nav{
    width: 900px;
    height: 100px;
    margin: 100px auto 0;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .nav_top{
    height: 31px;
    position: relative;
  }
  .icon_bd{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;

    align-items: center;
  }
  .line{
    margin-top: 14px;
    height: 2px;
    background-color: #b9b9b9;
  }
  .line_on{
    background-color:#6698ff;
  }
  .icond{
    text-align: center;
    position: absolute;
    width: 150px;
    height: 50px;
    color: #666;
    top: 0;
  }
  .icond span{
    position: relative;
    left: -55px;
  }
  .icons{
    width: 60px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: relative;
    left: -8px;
  }
  .ic{
    height: 10px;
    width: 10px;
    background-color: #cdcdcd;
    border-radius: 50%;
  }
  .ic_on{
     background-color: #6698ff;
     border: 2px solid #fff;
     box-shadow: 0 0 0 1px #6698ff;
  }
</style>

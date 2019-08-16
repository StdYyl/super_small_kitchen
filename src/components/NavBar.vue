<template>
  <div class="navbar_container">
    <div class="navbar_left">
      <img src="./../../static/images/logo.png" alt="">
    </div>
    <div class="navbar_right">
      <div class="dash_manager">
        <img src="./../../static/images/panda.png" alt="">
        <div class="operation">
          <el-dropdown>
          <span class="el-dropdown-link">
            平台管理员-Mr.Roy<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/dashboard/main_page" tag="span">首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/login" tag="span">退出登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
  .navbar_container{
    width: 100%;
    display: flex;
    height: 70px;
    background-color: #fff;
    min-width: 1200px;
  }
  .navbar_left{
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar_right{
    flex: 8;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
  }
  .dash_manager{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dash_manager img{
    width: 40px;
    height: 40px;
  }
  .operation{
    margin-left: 10px;
  }
  .operation span{
    cursor: pointer;
  }
</style>

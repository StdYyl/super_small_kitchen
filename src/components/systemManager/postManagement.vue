<template>
  <div class="room">
    <headCrumb></headCrumb>
    <div class="bd_mes">
      <p class="title">岗位</p>
      <div class="manager">
        <div class="every_manager" v-for="(item,index) in manager" :key="index">
          <img :src='item.imgsrc' style="height: 80px"/>
          <div>
            <p class="every_manager_title">{{item.title}}</p>
            <p style="font-size: 14px">岗位描述</p>
            <div class="permissions">
              <p style="color: rgb(153, 153, 153);font-size: 14px;margin-bottom: 3px">所属权限</p>
              <span v-for="itemed in item.permissions">{{itemed}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import headCrumb from './breadcrumbS'
  export default {
    name: 'postManagement',
    components:{
      headCrumb,
    },
    data() {
      return {
        manager: [
          {
            imgsrc: require('@/assets/role_master.png'),
            title: '管理员',
            permissions: ['用户管理', '菜品管理', '会员管理', '系统管理', '全部功能']
          }, {
            imgsrc: require('@/assets/role_operate.png'),
            title: '运营管理',
            permissions: ['菜谱管理', '商品管理', '二维码管理', '会员管理', '订单管理', '留言管理']
          }, {
            imgsrc: require('@/assets/role_reception.png'),
            title: '前台管理',
            permissions: ['会员管理', '订单管理', '二维码管理', '留言管理']
          }, {
            imgsrc: require('@/assets/role_member.png'),
            title: '会员管理',
            permissions: ['会员管理', '订单管理']
          }, {
            imgsrc: require('@/assets/role_finance.png'),
            title: '财务管理',
            permissions: ['结算管理', '订单管理']
          },
        ]
      };
    }
  };
</script>

<style scoped>
  .room{
    max-width: 1280px;
  }
  .header {
    margin: 34px 0 20px 0;
    padding-left: 20px;
    padding-top: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }

  .title {
    font: normal 500 20px/56px '微软雅黑';
  }

  .bd_mes {
    background-color: #fff;
    min-height: 800px;
    border: 1px solid #ddd;
    padding: 24px 20px;
  }

  .manager {
    display: flex;
    flex-wrap: wrap;
  }

  .every_manager {
    display: flex;
    padding: 10px;
    margin: 10px 10px 0;
    width: 45%;
    border: 1px solid #ddd;
  }

  .every_manager > img {
    padding-right: 10px;
  }

  .every_manager_title {
    font: 700 18px '微软雅黑';
    padding: 3px 0;
  }

  .permissions {
    margin-top: 7px;
    font-size: 14px;
  }
  .permissions span+span{
    padding: 0 2px;
  }
</style>

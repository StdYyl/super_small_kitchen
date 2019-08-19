<template>
    <div class="app_wrapper">
      <NavBar></NavBar>
      <div class="main_container">
        <SliderBar></SliderBar>
        <div class="app_main">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import NavBar from './../../components/NavBar';
import SliderBar from './../../components/SliderBar';

export default {
  name: 'DashBoard',
  data() {
    return {};
  },
  components: {
    NavBar,
    SliderBar,
  },
};
</script>

<style scoped>
  .app_wrapper{
  }
  .main_container{
    width: 100%;
    display: flex;
    background-color: #f8f9fb;
    min-width: 1200px;
  }
  .app_main{
    flex: 9;
    margin-right: 50px;
  }
</style>

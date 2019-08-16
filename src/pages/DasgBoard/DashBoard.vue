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
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .main_container{
    width: 100%;
    display: flex;
    background-color: #f8f9fb;
    position: relative;
    min-width: 1400px;
  }
  .app_main{
    flex: 9;
    margin-right: 50px;
  }
</style>

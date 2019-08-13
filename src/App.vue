<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body, div, dl, dt, dd, ul, ol, li, h1, h2,h3,form,fieldset,input,textarea,p,blockquote,th,td { margin:0; padding:0; }
ol,ul{
  list-style: none;
}
/*左浮动*/
.leftfloat{float: left;}
/*右浮动*/
.rightfloat{float: right;}
/*链接字体颜色*/
a{color: #646464;text-decoration:none;}
/*清楚浮动*/
.clearfix:after{content:"";display: block;clear: both;}
.clearfix{zoom: 1;}
.none{
  display: none;
}
input,body,img{border: none;}



</style>

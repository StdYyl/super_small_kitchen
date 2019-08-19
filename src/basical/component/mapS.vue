<template>
    <remote-js :src="url"></remote-js>
</template>

<script>
// 引入腾讯地图
  export default {
    name: 'mapS',
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
        },
        props: {
          src: { type: String, required: true },
        },
      },
    },
    props:{
      url:String
    },
    mounted() {
      console.log(this.url  )
    }
  };
</script>

<template>
  <div>
    <breadcrumb></breadcrumb>
  </div>
</template>

<script>
  import {getCookBookList} from '@/api/cookBook';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name: 'categoryAdd',
    components:{breadcrumb},
  };
</script>

<style scoped>

</style>

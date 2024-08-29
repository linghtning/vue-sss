<script setup lang='ts'>
const num = ref(20)
</script>

<template>
  <div>
    <a-button>搜索</a-button>
    {{ num }}
    <router-view />
  </div>
</template>

<style lang='scss' scoped>

</style>

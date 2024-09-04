<script setup lang="ts" name="TableOperateButton">
//
</script>

<template>
  <button class="table-operate-button">
    <slot />
  </button>
</template>

<style lang="less" scoped>
.table-operate-button {
  color: @primary-color;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: lighten(@primary-color, 30%);
  }
}
</style>

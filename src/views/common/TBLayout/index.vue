<script setup lang="ts" name="VTBLayout"></script>

<template>
  <div class="tb-layout">
    <div class="top-area">
      <slot name="top" />
    </div>
    <div class="bottom-area">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tb-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-area {
    width: 100%;
    flex: none;
  }
  .bottom-area {
    width: 100%;
    height: 0px;
    flex: 1;
    margin-top: 16px;
  }
}

:global(.basic-page) {
  height: 100%;
}
</style>

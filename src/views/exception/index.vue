<script lang="ts" setup name="VException">
import { useRouter } from 'vue-router'

const props = defineProps({
  code: {
    type: Number,
    default: 404,
  },
})

const exceptionTipMap: Recordable<string> = {
  404: '抱歉，您访问的页面不存在。',
  403: '抱歉，您没有访问权限。',
}

const router = useRouter()

function backHome() {
  router.replace('/')
}
</script>

<template>
  <div class="mcontainer exception-page">
    <a-result :status="code" :title="code" :sub-title="exceptionTipMap[code]">
      <template #extra>
        <a-button type="primary" @click="backHome">
          返回首页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<style lang="less" scoped>
.exception-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5%;
}
</style>

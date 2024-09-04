<script setup lang="ts" name="BasicTable">
import { useWindowSize } from '@vueuse/core'

defineProps({
  paginationData: {
    type: Object as PropType<Recordable>,
    default() {
      return {}
    },
  },
  selectedRows: {
    type: Object as PropType<Recordable[]>,
    default() {
      return []
    },
  },
})

const emit = defineEmits(['getTableData'])

const { height: windowheight } = useWindowSize()

const tableAreaRef = ref()
const tableHeight = ref(0)

function updateTableHeight() {
  nextTick(() => {
    tableHeight.value = tableAreaRef.value.clientHeight - 54 // 减去表头高度
  })
}

onMounted(() => {
  updateTableHeight()
})

watch(windowheight, updateTableHeight)

function tableStripedRowClassName(record: Recordable, index: number) {
  return index % 2 === 1 ? 'striped-row' : null
}

function getTableData() {
  emit('getTableData')
}

defineExpose({ updateTableHeight })
</script>

<template>
  <div class="basic-table">
    <div v-if="$slots.query" class="query-area">
      <slot name="query" />
    </div>
    <div v-if="$slots.topAction" class="top-action-area">
      <slot name="topAction" />
    </div>
    <div ref="tableAreaRef" class="table-area inner-ant-table-striped">
      <slot name="table" :table-height="tableHeight" :striped-row-class-name="tableStripedRowClassName" />
    </div>
    <div class="bottom-action-area">
      <slot name="bottomAction">
        <div class="basic-table-pagination">
          <div class="tip">
            当前选择 <i>{{ selectedRows.length }}</i> 项，共 <i>{{ paginationData.total }}</i> 项
          </div>
          <a-pagination
            v-model:current="paginationData.page"
            v-model:pageSize="paginationData.pageSize"
            size="small"
            :total="paginationData.total"
            :page-size-options="paginationData.pageSizeOptions"
            show-size-changer
            show-quick-jumper
            @change="getTableData"
            @show-size-change="getTableData"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.basic-table {
  display: flex;
  flex-direction: column;
  height: 100%;

  .query-area {
    flex: none;
    width: 100%;
  }

  .top-action-area {
    flex: none;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .table-area {
    flex: 1;
    width: 100%;
    height: 0;
  }

  .bottom-action-area {
    flex: none;
    width: 100%;
    margin-top: 20px;
  }
}
</style>

<style lang="less">
.inner-ant-table-striped {
  .striped-row {
    td {
      background-color: #f6f6f6;
    }
  }
}
</style>

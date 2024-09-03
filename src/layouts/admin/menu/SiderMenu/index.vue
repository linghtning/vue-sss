<script setup lang="ts" name="LSiderMenu">
import TreeMenu from '../TreeMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { MenuModeEnum } from '@/enums/layoutEnum'
import { handleGoFromMenuKey } from '@/logics/helper/layout'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['switchSider'])

const layoutStore = useLayoutStore()

const menuTree = layoutStore.menuTree

const { menuMode, currentTopMenuKey, selectedMenuKey, selectedMenuKeyPath }
  = storeToRefs(layoutStore)

// eslint-disable-next-line vue/return-in-computed-property
const showMenuTree = computed(() => {
  if (menuMode.value === MenuModeEnum.SIDE) {
    return menuTree
  }
  else if (menuMode.value === MenuModeEnum.MIX) {
    const treeNode = menuTree.find((item) => {
      return item.key === currentTopMenuKey.value
    })

    return treeNode?.children || []
  }
  else if (menuMode.value === MenuModeEnum.TOP) {
    return []
  }
})

const selectedKeys = computed(() => {
  return selectedMenuKey.value ? [selectedMenuKey.value] : []
})

const openKeys = computed(() => {
  let dirKeyPath = selectedMenuKeyPath.value.slice(0, selectedMenuKeyPath.value.length - 1)
  if (menuMode.value === MenuModeEnum.MIX) {
    dirKeyPath = dirKeyPath.slice(1)
  }
  return dirKeyPath
})

// eslint-disable-next-line unused-imports/no-unused-vars
function onMenuClick({ item, key, keyPath }: any) {
  handleGoFromMenuKey(key)
}

watch(
  showMenuTree,
  () => {
    if (menuMode.value === MenuModeEnum.MIX && showMenuTree.value?.length === 0) {
      emit('switchSider', false)
    }
    else {
      emit('switchSider', true)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="sider-menu">
    <TreeMenu
      :menu-tree="showMenuTree"
      mode="inline"
      theme="light"
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      :inline-collapsed="collapsed"
      @menu-click="onMenuClick"
    />
  </div>
</template>

<style lang="less" scoped>
.sider-menu {
  width: 100%;

  :deep {
    .ant-menu {
      border-right-color: #fff;
    }

    .ant-menu-sub.ant-menu-inline {
      background: #fff;
    }

    .ant-menu-vertical {
      border-right: none;
    }
  }
}
</style>

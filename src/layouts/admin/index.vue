<script setup lang="ts" name="LAdmin">
import { Modal } from 'ant-design-vue/es'
import { UseFullscreen } from '@vueuse/components'
import AliveRouterView from '../aliveRouterView/index.vue'
import SiderMenu from './menu/SiderMenu/index.vue'
import TopMenu from './menu/TopMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useUserStore } from '@/store/modules/user'
import { MenuModeEnum } from '@/enums/layoutEnum'
import { getEnv } from '@/utils/env'
import { generateMenuPath, goMenuFirstLeafNode } from '@/logics/helper/layout'
import { BasicPageEnum } from '@/enums/pageEnum'
import avatarImg from '@/assets/images/layout/avatar.svg'

const router = useRouter()

const siderCollapsed = ref(false)

function switchCollapsed() {
  siderCollapsed.value = !siderCollapsed.value
}

const showSider = ref(true)

function switchSider(show: boolean) {
  showSider.value = show
}

const layoutStore = useLayoutStore()

const { menuMode, pageTabs, menuTree, selectedMenuKey, adminLayoutEl } = storeToRefs(layoutStore)

const { VITE_APP_TITLE: layoutTitle, VITE_APP_TITLE_EN: layoutSubTitle } = getEnv()

const tabsActiveKey = computed(() =>
  layoutStore.currentPageTab ? layoutStore.currentPageTab.route : '',
)

function onTabsChange(key: string) {
  router.push(key)
}

function onTabsEdit(key: string, action: string) {
  if (action === 'remove') {
    layoutStore.closePageTab(key)
  }
}

const userActionMenu = ref<Recordable[]>([
  {
    title: '账户设置',
    key: 'account',
    icon: {
      name: 'user-gear',
      form: 'light',
    },
  },
  {
    title: '退出',
    key: 'logout',
    icon: {
      name: 'arrow-right-from-bracket',
      form: 'light',
    },
  },
])
function onUserActionMenuClick({ item, key, keyPath }: any) {
  if (key === 'logout') {
    handleLogout()
  }
}

const systemMenu = ref<Recordable[]>([
  {
    title: '工作台',
    key: 'dashboard',
    icon: {
      name: 'briefcase',
      form: 'light',
    },
  },
  {
    title: '资产子系统',
    key: 'assets',
    icon: {
      name: 'server',
      form: 'light',
    },
  },
  {
    title: '漏洞子系统',
    key: 'bug',
    icon: {
      name: 'bug',
      form: 'light',
    },
  },
  {
    title: '威胁子系统',
    key: 'threaten',
    icon: {
      name: 'radiation',
      form: 'light',
    },
  },
])
function onSwitchSystemClick({ item, key, keyPath }: any) {
  // if (key === 'xxx') {}
}

const userStore = useUserStore()

function handleLogout() {
  Modal.confirm({
    title: '提示',
    content: '您确定要注销吗？',
    onOk: () => {
      userStore.logout()
      router.push(BasicPageEnum.LOGIN)
    },
  })
}

function onTabsActionMenuClick({ item, key, keyPath }: any) {
  if (key === 'all') {
    layoutStore.closeAllPageTabs()
  }
  else if (key === 'other') {
    layoutStore.closeOtherPageTabs()
  }
}

function onLogoAreaClick() {
  goMenuFirstLeafNode(menuTree.value)
}

const menuNodePath = computed(() => {
  const { menuNodePath } = generateMenuPath(menuTree.value, selectedMenuKey.value)
  return menuNodePath
})

const adminLayoutRef = ref()
onMounted(() => {
  layoutStore.setAdminLayoutEl(adminLayoutRef.value)
})
</script>

<template>
  <UseFullscreen v-slot="{ isFullscreen, toggle: toggleFullscreen }" class="fullscreen-wrapper">
    <div
      ref="adminLayoutRef"
      class="mcontainer admin-layout"
      :class="{
        'mix-menu-mode': menuMode === MenuModeEnum.MIX,
        'side-menu-mode': menuMode === MenuModeEnum.SIDE,
      }"
    >
      <aside
        v-show="menuMode !== MenuModeEnum.TOP && showSider"
        class="admin-layout-aside"
        :class="{ collapsed: siderCollapsed }"
      >
        <div v-if="menuMode === MenuModeEnum.SIDE" class="logo-area" @click="onLogoAreaClick">
          <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo">
          <div v-show="!siderCollapsed" class="title-area">
            <h1 class="title">
              {{ layoutTitle }}
            </h1>
            <h2 class="sub-title">
              {{ layoutSubTitle }}
            </h2>
          </div>
        </div>
        <nav class="side-menu-area">
          <div class="side-menu-scroll-area">
            <SiderMenu :collapsed="siderCollapsed" @switch-sider="switchSider" />
          </div>
          <div class="action-area" @click="switchCollapsed">
            <Icon type="ant" :name="siderCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
          </div>
        </nav>
      </aside>
      <main class="admin-layout-main">
        <header class="admin-layout-header">
          <div v-show="menuMode !== MenuModeEnum.SIDE" class="logo-area" @click="onLogoAreaClick">
            <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo">
            <h1 class="title">
              {{ layoutTitle }}
            </h1>
          </div>
          <nav v-show="menuMode !== MenuModeEnum.SIDE" class="top-menu-area">
            <TopMenu />
          </nav>
          <nav v-show="menuMode === MenuModeEnum.SIDE" class="breadcrumb">
            <a-breadcrumb separator=">">
              <a-breadcrumb-item v-for="item in menuNodePath" :key="item.key">
                {{ item.title }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </nav>
          <div class="global-action-area">
            <div class="action-item custom">
              <div class="toolbar">
                <div class="item" @click="toggleFullscreen">
                  <Icon :name="isFullscreen ? 'compress' : 'expand'" form="light" />
                </div>
                <a-dropdown :get-popup-container="() => adminLayoutEl">
                  <div class="item">
                    <Icon name="arrow-right-arrow-left" form="light" />
                  </div>
                  <template #overlay>
                    <a-menu @click="onSwitchSystemClick">
                      <a-menu-item v-for="item in systemMenu" :key="item.key">
                        <template #icon>
                          <Icon :name="item.icon.name" :form="item.icon.form" />
                        </template>
                        <span>{{ item.title }}</span>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <div class="item">
                  <Icon name="upload" form="light" />
                </div>
              </div>
            </div>
            <div class="action-item" style="padding: 0">
              <a-dropdown :get-popup-container="() => adminLayoutEl">
                <div class="user-action-box">
                  <img class="user-avatar" :src="avatarImg" alt="user-avatar">
                  <div class="username">
                    用户1
                  </div>
                </div>
                <template #overlay>
                  <a-menu class="user-action-menu" @click="onUserActionMenuClick">
                    <a-menu-item v-for="item in userActionMenu" :key="item.key">
                      <template #icon>
                        <Icon :name="item.icon.name" :form="item.icon.form" />
                      </template>
                      <span>{{ item.title }}</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </header>
        <section class="admin-layout-tabs">
          <div class="tabs-area">
            <a-tabs
              :active-key="tabsActiveKey"
              type="editable-card"
              hide-add
              tab-position="top"
              :tab-bar-gutter="0"
              @change="onTabsChange"
              @edit="onTabsEdit"
            >
              <a-tab-pane
                v-for="item in pageTabs"
                :key="item.route"
                :tab="item.title"
                :closable="pageTabs.length > 1"
              />
              <template #rightExtra>
                <a-dropdown :get-popup-container="() => adminLayoutEl">
                  <a-button>
                    <template #icon>
                      <Icon type="ant" name="DownOutlined" />
                    </template>
                  </a-button>
                  <template #overlay>
                    <a-menu @click="onTabsActionMenuClick">
                      <!-- <a-menu-item key="all">
                        <span>关闭全部选项卡</span>
                      </a-menu-item> -->
                      <a-menu-item key="other">
                        <span>关闭其他选项卡</span>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-tabs>
          </div>
        </section>
        <section class="admin-layout-content">
          <AliveRouterView />
        </section>
      </main>
    </div>
  </UseFullscreen>
</template>

<style lang="less" scoped>
@aside-width: 250px;
@aside-bg: #151529;

.fullscreen-wrapper {
  width: 100%;
  height: 100%;
}

.admin-layout {
  display: flex;
  background-color: #fff;

  .logo-area {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 96px;
    cursor: pointer;

    .logo {
      width: 28px;
      height: auto;
    }

    .title-area {
      margin-left: 12px;

      .title {
        font-size: 20px;
        color: #fff;
      }

      .sub-title {
        font-size: 10px;
        color: #fff;
      }
    }
  }

  &.side-menu-mode {
    .admin-layout-main {
      .admin-layout-header {
        justify-content: space-between;
      }
    }
  }

  &.mix-menu-mode {
    .admin-layout-aside {
      .side-menu-area {
        margin-top: 48px;
      }
    }

    .admin-layout-main {
      z-index: 3;
      padding-top: 48px;

      .admin-layout-header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #001529;

        .logo-area {
          .title {
            color: #eee;
          }
        }

        .global-action-area {
          .action-item {
            color: #eee;

            &:hover {
              background-color: #252a3d;
            }
          }
        }
      }
    }
  }

  .admin-layout-aside {
    position: relative;
    z-index: 2;
    display: flex;
    flex: none;
    flex-direction: column;
    width: @aside-width;
    height: 100%;
    background-color: @aside-bg;
    box-shadow: 2px 0 8px rgb(29 35 41 / 5%);

    &.collapsed {
      width: 80px;

      .action-area {
        justify-content: center;
      }
    }

    .side-menu-area {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;
      height: 0;

      .side-menu-scroll-area {
        flex: 1;
        width: 100%;
        height: 0;
        overflow-y: auto;
      }

      .action-area {
        display: flex;
        flex: none;
        align-items: center;
        width: 100%;
        height: 48px;
        padding: 16px;
        // border-top: 1px solid rgba(0, 0, 0, 0.06);
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .admin-layout-main {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 0;
    height: 100%;

    .admin-layout-header {
      position: relative;
      z-index: 2;
      display: flex;
      flex: none;
      width: 100%;
      height: 64px;
      padding-right: 16px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 12%);

      .logo-area {
        width: @aside-width;
        height: 100%;
      }

      .top-menu-area {
        flex: 1;
        width: 0;
        height: 100%;
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 16px;
      }

      .global-action-area {
        display: flex;
        flex: none;
        height: 100%;

        .action-item {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 12px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: #f3f6f9;
          }

          &.custom {
            padding: 0;
            cursor: unset;

            &:hover {
              background-color: unset;
            }
          }

          & + .action-item {
            margin-left: 8px;
          }

          .toolbar {
            display: flex;
            align-items: center;

            .item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              font-size: 14px;
              color: #878a99;
              cursor: pointer;
              border-radius: 50%;
              transition: all 0.3s;

              &:hover {
                background-color: #f3f6f9;
              }
            }
          }

          .user-action-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 12px;

            .user-avatar {
              width: 32px;
              height: 32px;
              margin-right: 8px;
            }

            .username {
              color: #878a99;
            }
          }
        }
      }
    }

    .admin-layout-tabs {
      position: relative;
      z-index: 1;
      display: flex;
      flex: none;
      width: 100%;
      height: 32px;

      .tabs-area {
        flex: 1;
        width: 0;
        height: 100%;

        :deep {
          .ant-tabs {
            height: 100%;

            .ant-tabs-nav,
            .ant-tabs-nav-wrap,
            .ant-tabs-nav-list {
              height: 100%;
            }

            .ant-tabs-nav {
              margin: 0;

              &::before {
                border-bottom: none;
              }

              .ant-tabs-nav-operations {
                .ant-tabs-nav-more {
                  display: flex;
                  align-items: center;
                  padding: 0 15px; // 与按钮一致
                  font-size: 18px;
                  cursor: pointer;
                  background-color: #fff;
                  border-left: 1px solid #ddd;
                  transition: all 0.3s;

                  &:hover {
                    color: #40a9ff;
                  }
                }
              }

              .ant-tabs-extra-content {
                .ant-btn {
                  width: 49px;
                  border: none;
                  border-left: 1px solid #ddd;
                  border-radius: 0;

                  .anticon {
                    font-size: 14px;
                  }

                  &:focus {
                    color: unset;
                  }

                  &:hover {
                    color: @primary-color;
                  }
                }
              }
            }

            .ant-tabs-content-holder {
              display: none;
            }

            .ant-tabs-tab {
              height: 100%;
              padding: 0 12px;
              color: unset;
              background-color: #fff;
              border: none;

              .ant-tabs-tab-btn {
                color: unset;
              }

              .ant-tabs-tab-remove {
                width: 15px;
                height: 15px;
                line-height: 15px;
                border-radius: 50%;

                &:hover {
                  background-color: darken(@page-bg-color, 10%);
                }

                &:focus {
                  color: rgb(0 0 0 / 45%);
                }
              }

              &:hover {
                background-color: darken(@page-bg-color, 5%);
              }
            }

            .ant-tabs-tab-active {
              color: @primary-color;
              background-color: @page-bg-color;

              &:hover {
                background-color: @page-bg-color;
              }
            }
          }
        }
      }
    }

    .admin-layout-content {
      position: relative;
      flex: 1;
      width: 100%;
      height: 0;
      overflow: auto;
    }
  }
}

:global(.user-action-menu .ant-dropdown-menu-item) {
  min-width: 120px;
}
</style>

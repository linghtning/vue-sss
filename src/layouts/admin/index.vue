<script setup lang="ts" name="LAdmin">
import { Modal } from 'ant-design-vue/es'
import AliveRouterView from '../aliveRouterView/index.vue'
import SiderMenu from './menu/SiderMenu/index.vue'
import TopMenu from './menu/TopMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useUserStore } from '@/store/modules/user'
import { MenuModeEnum } from '@/enums/layoutEnum'
import { getEnv } from '@/utils/env'
import { goMenuFirstLeafNode } from '@/logics/helper/layout'
import { BasicPageEnum } from '@/enums/pageEnum'

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

const { menuMode, pageTabs, menuTree } = storeToRefs(layoutStore)

const { VITE_APP_TITLE: layoutTitle } = getEnv()

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

// eslint-disable-next-line unused-imports/no-unused-vars
function onUserActionMenuClick({ item, key, keyPath }: any) {
  if (key === 'logout') {
    handleLogout()
  }
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

// eslint-disable-next-line unused-imports/no-unused-vars
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
</script>

<template>
  <div class="container admin-layout" :class="{ 'mix-menu-mode': menuMode === MenuModeEnum.MIX }">
    <aside
      v-show="menuMode !== MenuModeEnum.TOP && showSider"
      class="admin-layout-aside"
      :class="{ collapsed: siderCollapsed }"
    >
      <div v-if="menuMode === MenuModeEnum.SIDE" class="logo-area" @click="onLogoAreaClick">
        <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo">
        <h1 v-show="!siderCollapsed" class="title">
          {{ layoutTitle }}
        </h1>
      </div>
      <nav class="side-menu-area">
        <div class="side-menu-scroll-area">
          <SiderMenu :collapsed="siderCollapsed" @switch-sider="switchSider" />
        </div>
        <div class="action-area" @click="switchCollapsed">
          <Icon :name="siderCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
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
        <nav class="top-menu-area">
          <TopMenu />
        </nav>
        <div class="global-action-area">
          <div class="action-item" style="padding: 0">
            <a-dropdown>
              <div class="user-action-box">
                <img
                  class="user-avatar"
                  src="/src/assets/images/layout/logo.png"
                  alt="user-avatar"
                >
                <div class="username">
                  用户1
                </div>
              </div>
              <template #overlay>
                <a-menu class="user-action-menu" @click="onUserActionMenuClick">
                  <a-menu-item key="logout">
                    <template #icon>
                      <Icon name="LogoutOutlined" />
                    </template>
                    <span>退出登录</span>
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
              <a-dropdown>
                <a-button>
                  <template #icon>
                    <Icon name="DownOutlined" />
                  </template>
                </a-button>
                <template #overlay>
                  <a-menu @click="onTabsActionMenuClick">
                    <a-menu-item key="all">
                      <span>关闭全部选项卡</span>
                    </a-menu-item>
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
</template>

<style lang="less" scoped>
.admin-layout {
  display: flex;

  .logo-area {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    cursor: pointer;

    .logo {
      width: 32px;
      height: auto;
    }

    .title {
      margin-left: 12px;
      font-size: 18px;
      font-weight: 600;
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
    width: 250px;
    height: 100%;
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
        font-size: 16px;
        cursor: pointer;
        border-top: 1px solid rgb(0 0 0 / 6%);
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
      height: 48px;
      padding-right: 16px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 12%);

      .logo-area {
        width: 250px;
        height: 100%;
      }

      .top-menu-area {
        flex: 1;
        width: 0;
        height: 100%;
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
            background-color: rgb(0 0 0 / 2.5%);
          }

          & + .action-item {
            margin-left: 8px;
          }

          .user-action-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 12px;

            .user-avatar {
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }

            .username {
              font-size: 14px;
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
                    color: #40a9ff;
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
                  background-color: #bbb;
                }

                &:focus {
                  color: rgb(0 0 0 / 45%);
                }
              }

              &:hover {
                background-color: #ddd;
              }
            }

            .ant-tabs-tab-active {
              background-color: #f0f2f5;

              &:hover {
                background-color: #f0f2f5;
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
  min-width: 160px;
}
</style>

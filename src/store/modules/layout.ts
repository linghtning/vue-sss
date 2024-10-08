import type { LayoutState, TabInfo } from '/#/store'
import type { RouteLocationNormalized } from 'vue-router'

import { defineStore } from 'pinia'
import layoutSetting from '@/settings/layoutSetting'
import { generateMenuPath } from '@/logics/helper/layout'
import { router } from '@/router'
import { BasicPageEnum } from '@/enums/pageEnum'

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutState => ({
    menuMode: layoutSetting.menuMode,
    menuTree: layoutSetting.menuTree,
    selectedMenuKeyPath: [],
    pageTabs: [],
    currentTabIndex: -1,
    cachedRoutes: new Set(),
    adminLayoutEl: null,
  }),
  getters: {
    currentTopMenuKey(state): string {
      return state.selectedMenuKeyPath[0] || ''
    },
    selectedMenuKey(state): string {
      return state.selectedMenuKeyPath[state.selectedMenuKeyPath.length - 1] || ''
    },
    currentPageTab(state): TabInfo | null {
      return state.pageTabs[state.currentTabIndex] || null
    },
  },
  actions: {
    setAdminLayoutEl(el: any) {
      this.adminLayoutEl = el || null
    },
    refreshPage(route: RouteLocationNormalized) {
      if (route.meta.cache !== false) {
        this.clearRouteCache(route.fullPath)
      }
      router.replace(BasicPageEnum.REFRESH)
    },
    updateCachedRoutes(route: RouteLocationNormalized) {
      if (route.meta.cache !== false) {
        this.cachedRoutes.add(route.fullPath)
      }
    },
    clearRouteCache(fullPath: string) {
      if (this.cachedRoutes.has(fullPath)) {
        this.cachedRoutes.delete(fullPath)
      }
    },
    updateSelectedMenuKeyPath(route: RouteLocationNormalized) {
      let matchKey: any = route.meta.menuMatchKey
      if (!matchKey) {
        matchKey = route.name
      }
      const { menuKeyPath } = generateMenuPath(this.menuTree, String(matchKey))
      this.selectedMenuKeyPath = menuKeyPath
    },
    updatePageTabs(route: RouteLocationNormalized) {
      if (route.meta.allowTabControl === false) {
        this.currentTabIndex = -1
        return
      }

      const fullPath = route.fullPath
      const tabIndex = this.pageTabs.findIndex((item: TabInfo) => {
        return item.route === fullPath
      })
      if (tabIndex !== -1) {
        this.currentTabIndex = tabIndex
      }
      else {
        this.pageTabs.push({
          route: fullPath,
          title: route.meta.title,
          cache: route.meta.cache || true,
        })
        this.currentTabIndex = this.pageTabs.length - 1
      }
    },
    closePageTab(key: string) {
      const tabIndex = this.pageTabs.findIndex((item: TabInfo) => {
        return item.route === key
      })
      if (tabIndex !== -1) {
        // 关闭页签后，清除路由缓存
        const removeTab = this.pageTabs[tabIndex]
        if (removeTab.cache) {
          this.clearRouteCache(key)
        }
        this.pageTabs.splice(tabIndex, 1)
        // 关闭了最后一个Tab（一般页面上控制至少保留一个）
        if (this.pageTabs.length === 0) {
          this.currentTabIndex = -1
        }
        else {
          let nextTabIndex
          if (tabIndex === this.currentTabIndex) {
            // 关闭当前选中Tab
            // 判断当前选中Tab是不是第一个
            nextTabIndex = tabIndex === 0 ? 0 : tabIndex - 1
            const nextTab = this.pageTabs[nextTabIndex]
            router.push(nextTab.route)
          }
          else {
            // 关闭其他未选中Tab
            if (this.currentTabIndex === -1) {
              // 全都未选中时
              nextTabIndex = -1
            }
            else {
              nextTabIndex
                = tabIndex > this.currentTabIndex ? this.currentTabIndex : this.currentTabIndex - 1
            }
            this.currentTabIndex = nextTabIndex
          }
        }
      }
    },
    closeAllPageTabs() {
      this.pageTabs = []
      this.currentTabIndex = -1
    },
    closeOtherPageTabs() {
      // 没有选中Tab时
      if (this.currentTabIndex === -1) {
        this.closeAllPageTabs()
      }
      else {
        const tab = this.pageTabs[this.currentTabIndex]
        this.pageTabs = [tab]
        this.currentTabIndex = 0
      }
    },
    openPageTab(route: RouteLocationNormalized, title: string) {
      const fullPath = route.fullPath
      const tabIndex = this.pageTabs.findIndex((item: TabInfo) => {
        return item.route === fullPath
      })
      if (tabIndex === -1) {
        this.pageTabs.push({
          route: fullPath,
          title,
          cache: route.meta.cache || true,
        })
        this.currentTabIndex = this.pageTabs.length - 1
      }
      else {
        console.error('该路由的Tab已存在')
      }
    },
  },
})

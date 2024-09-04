import type { MenuTree } from '/#/store'

import type { RoutePermissionModeEnum } from '/@/enums/appEnum'
import type { MenuModeEnum } from '/@/enums/layoutEnum'

export interface ProjectSetting {
  routePermissionMode: RoutePermissionModeEnum
  showPageTitleSuffix: boolean
  iconfontUrl: string
}

export interface LayoutSetting {
  menuMode: MenuModeEnum
  menuTree: MenuTree
  hiddenMixTopMenuKeys: string[]
  flatDirKeys: string[]
}

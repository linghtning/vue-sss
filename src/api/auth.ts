import { httpRequester } from '@/utils/http/axios'

enum Api {
  // 获取权限数据
  getPermissionData = '/xxx',
}

export function getPermissionData() {
  return httpRequester.get({
    url: Api.getPermissionData,
  })
}

import { ApiModel, commonRes } from '../utils/_const'
/* 1.总体资源接入进度 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getResourceAccessProgress`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = {
        resCapacity1: 20,
        resCapacity2: 80,
        resCapacity3: 130,
        nowResCapacity: 48.26,
      }
      return commonRes(data)
    },
  },
]

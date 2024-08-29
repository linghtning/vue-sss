import { ApiModel, commonRes } from '../utils/_const'
/* 6.区域级子虚拟电厂建设成效 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getAreaVppEffect`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = {
        areaVppCount: 1,
        adjAbility: null,
        maxLoadRate: null,
        divisionList: [
          {
            divisionName: '高新西区',
            divisionCode: '001',
          },
        ],
      }
      return commonRes(data)
    },
  },
]

import { ApiModel, commonRes } from '../utils/_const'
/* 4.行业级子虚拟电厂建设成效 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getIndustryVppEffect`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = {
        industryVppCount: 3,
        adjAbility: null,
        maxLoadRate: null,
        industryList: [
          {
            industryName: '充换电站',
            industryCode: '001',
          },
          {
            industryName: '通信基站',
            industryCode: '002',
          },
          {
            industryName: '公共照明',
            industryCode: '003',
          },
        ],
      }
      return commonRes(data)
    },
  },
]

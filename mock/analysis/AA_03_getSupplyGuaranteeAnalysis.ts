import { ApiModel, commonRes } from '../utils/_const'
/* 3.保供活动统计分析 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getSupplyGuaranteeAnalysis`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = [
        {
          name: '节约用电',
          resCount: 42,
          resDuration: 168,
          userCount: 880698,
          sumEnergy: 724.05,
          sumCo2: 0.09,
          avgEnergy: 17.24,
          avgRate: 105.84,
        },
        {
          name: '需求响应',
          resCount: 2,
          resDuration: 11,
          userCount: 4419,
          sumEnergy: 85.87,
          sumCo2: 0.04,
          avgEnergy: 171.74,
          avgRate: 0,
        },
        {
          name: '弹性负荷',
          resCount: null,
          resDuration: null,
          userCount: null,
          sumEnergy: null,
          sumCo2: null,
          avgEnergy: null,
          avgRate: null,
        },
      ]

      return commonRes(data)
    },
  },
]

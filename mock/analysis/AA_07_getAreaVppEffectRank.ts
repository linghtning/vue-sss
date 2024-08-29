import { ApiModel, commonRes } from '../utils/_const'
/* 7.区域级子虚拟电厂建设成效排名详情 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getAreaVppEffectRank`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = [
        {
          name: '响应次数',
          resultValue: 200,
          range: '0-100',
          unit: '次',
          rank: 1,
        },
        {
          name: '响应时长',
          resultValue: 200,
          range: '0-100',
          unit: '小时',
          rank: 1,
        },
        {
          name: '参与户次',
          resultValue: 200,
          range: '0-100',
          unit: '户次',
          rank: 1,
        },
        {
          name: '压降电量',
          resultValue: 200,
          range: '0-100',
          unit: '万kWh',
          rank: 1,
        },
        {
          name: '响应完成率',
          resultValue: 200,
          range: '0-100',
          unit: '-',
          rank: 1,
        },
      ]
      return commonRes(data)
    },
  },
]

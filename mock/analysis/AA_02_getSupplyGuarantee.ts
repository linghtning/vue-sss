import { ApiModel, commonRes } from '../utils/_const'
/* 2.保供运行统计 */
export default [
  {
    isConnected: true, // 加这个属性表示已接入
    url: `${ApiModel.ANYLYSIS}/getSupplyGuarantee`,
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = {
        supCount: 44,
        avgGapRate: 50.5,
        avgResComRate: null,
        sectionList: [
          // { sectionName: '广都', maxLoad: 20, resDuration: 28 },
          // { sectionName: '桃乡', maxLoad: 1, resDuration: 30 },
          // { sectionName: '蜀都玉堤', maxLoad: 0.5, resDuration: 32 },
          { sectionName: '全域', maxLoad: 300, resDuration: 9 },
        ],
        conserveCount: 42,
        demandCount: 2,
        elasticLoadCount: null,
        conserveEnergy: 724.05,
        demandEnergy: 85.87,
        elasticLoadEnergy: null,
      }
      return commonRes(data)
    },
  },
]

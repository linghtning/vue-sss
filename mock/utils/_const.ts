// 打包上线读取不到process.env.VITE_BASE_URL 没啥卵用

// 接口前缀
export enum ApiModel {
  HOME = `/bigscreen/index`, // 首页接口前缀
  MAP = `/bigscreen/map`, // 地图接口前缀
  RESOURCE = `/bigscreen/resource`, // 资源总览接口前缀
  SITUATION = `/bigscreen/situation`, // 供需形式接口前缀
  MONITORING = `/bigscreen/monitoring`, // 保供监测接口前缀
  ANYLYSIS = `/bigscreen/analysis`, // 成效分析接口前缀
}

// 通用返回
export function commonRes(data: any) {
  return {
    code: 200,
    msg: '操作成功',
    data,
  }
}

// 填充数据
export function addTimeVal(start: number, end: number, val: number) {
  const arr = Array(96).fill(null)
  const obj: any = {}
  arr.forEach((item, index) => {
    if (index >= start - 1 && index < end) {
      obj[`p${index + 1}`] = val
    }
    else {
      obj[`p${index + 1}`] = null
    }
  })
  return obj
}

function generate15MinuteIntervals(): string[] {
  const result: string[] = []
  for (let hour = 0; hour <= 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      result.push(formattedTime)
    }
  }
  return result
}

function roundTimeToNearest15Minutes(date: Date): Date {
  const minutes = Math.floor(date.getMinutes() / 15) * 15
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minutes)
}

function getCurrentTimeRoundedTo15Minutes(): string {
  const now = new Date()
  const rounded = roundTimeToNearest15Minutes(now)
  return `${rounded.getHours().toString().padStart(2, '0')}:${rounded.getMinutes().toString().padStart(2, '0')}`
}

export function findIndexForCurrentTime(intervals: string[]): number {
  const currentTime = getCurrentTimeRoundedTo15Minutes()
  return intervals.findIndex(interval => interval >= currentTime)
}

// 生成15分钟间隔的时间列表
export const intervals = generate15MinuteIntervals()

// 处理实时数据
export function dealRealTimeProp(obj: any, keys: string[]) {
  const temp = { ...obj }
  // 包含keys的才处理
  if (keys.length === 0)
    return obj
  // 获取当前时间到15分钟间隔的索引
  const i = findIndexForCurrentTime(intervals)
  // 循环需要转换的key
  keys.forEach((key) => {
    if (temp[key]) {
      // 遍历对象属性
      Object.keys(temp[key]).forEach((k, index) => {
        // 当索引大于等于当前时间到15分钟间隔的索引时，将属性值设置为null
        if (index >= i) {
          temp[key][k] = null
        }
      })
    }
  })
  return temp
}

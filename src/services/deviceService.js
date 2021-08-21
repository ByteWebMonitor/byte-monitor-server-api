const deviceTable = require('../models/deviceTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

/**
 * TodoService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class DeviceService {

  async getAllItemList(app_id, skip, limit) {
    // 使用 inspirecloud.db.table 获取数据表
    const ItemList = await deviceTable.where({
      app_id: app_id
    })
        .sort({createdAt: -1})// 使用 sort 指定按照 qty 逆序排序
        .skip(skip)// 使用 skip 跳过前 2 项
        .limit(limit)// 使用 limit 指定返回 2 项
        .find();
    const total = await deviceTable.where().count()
    return {
      ItemList: ItemList,
      total: total
    }
  }

  async create(device) {
    return await deviceTable.save(device);
  }

  async getRecentXMinNums(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let nums = await deviceTable.where({
      createdAt: db.gt(xMinAgoTimesDate),
      app_id: app_id
    }).count()
    return nums
  }

  async statXMinRecentPvOsRatio(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let info = await deviceTable.where({
      createdAt: db.gt(xMinAgoTimesDate),
      app_id: app_id
    })
    .groupBy('OS')
    .num().as('num')
    .find();

    return info
  }

  async statXMinRecentPvBrowserRatio(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let info = await deviceTable.where({
      createdAt: db.gt(xMinAgoTimesDate),
      app_id: app_id
    })
    .groupBy('browser')
    .num().as('num')
    .find();

    return info
  }

  async statXDayPerDayPv(app_id, xDay) {

  if (xDay>60) {
    return {
      code: 20001,
      msg: '不能获取60天之外的数据',
      list: []
    }
  }
  // 使用 where() 查询所有数据，使用 groupBy('type') 将查询数据按 type 分组，使用 sum('stock') 对 stock 字段求和
  // let timeNowTimestamp = new Date(new Date().toDateString('+08')).getTime()

  let nowDate = new Date()
  let timeNowTimestamp = new Date(nowDate.getUTCFullYear()+ '-' + (nowDate.getUTCMonth()+1) + '-' + (nowDate.getUTCDate()) + ' 00:00:00 +00').getTime() - 8 * 60 *60 * 1000
  // let timeNowTimestamp = new Date(nowDate.getUTCFullYear(), nowDate.getUTCMonth(), nowDate.getUTCDay()).getTime()


  let xDayAgoTimestamp = timeNowTimestamp - xDay* 24 * 60 * 60 * 1000
  const xDayAgoDate = new Date(xDayAgoTimestamp)

  const result = await deviceTable
    .where({
      createdAt: db.gt(xDayAgoDate),
      app_id: app_id
    })
    // 查询一个时间段的数据用于聚合
    // .where('createdAt')
    // .gte(new Date('2014-01-01'))
    // .lt(new Date())
    // 开始分组, 分组对象是表达式, 用 $dateToString 操作符将 date 转为年月日形态来分组
    // 
    .groupBy(db.dateToString({format: '%Y-%m-%d 00:00:00 +08', date: '$createdAt', timezone: '+08'}))
    .as('dateDay')
    .num()
    .as('num')
    // 聚合完成后对中间结果查询, 按照 totalSaleAmount 倒序排列
    .where()
    .sort({dateDay: 1})
    .find();

    let existMap = {}

    for (let item of result) {
      let timestap = new Date(item.dateDay).getTime()
      existMap[timestap] = item.num
    }



    let returnList = []
    let iterTime = xDayAgoTimestamp

    while(iterTime<=timeNowTimestamp) {
      let iterDate = new Date()

      let item = {
        timestamp: iterTime,
        date: new Date(iterTime).toLocaleString(),
        num: 0
      }

      if (iterTime in existMap) {
        item.num = existMap[iterTime]
      }

      returnList.push(item)

      iterTime+= 24 * 60 * 60 * 1000
    }

    return {
      code: 20000,
      msg: '获取成功',
      list: returnList
    }  
  }

  
  async statXHourPerHourPv(app_id, xHour) {


  if (xHour>72) {
    return {
      code: 20001,
      msg: '不能获取72小时之外的数据',
      list: []
    }
  }
  // 使用 where() 查询所有数据，使用 groupBy('type') 将查询数据按 type 分组，使用 sum('stock') 对 stock 字段求和
  
  let nowDate = new Date()
  let timeNowTimestamp = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), 0,0).getTime()
  let xHourAgoTimestamp = timeNowTimestamp - xHour * 60 * 60 * 1000
  const xHourAgoDate = new Date(xHourAgoTimestamp)

  const result = await deviceTable
    .where({
      createdAt: db.gt(xHourAgoDate),
      app_id: app_id
    })
    // 查询一个时间段的数据用于聚合
    // .where('createdAt')
    // .gte(new Date('2014-01-01'))
    // .lt(new Date())
    // 开始分组, 分组对象是表达式, 用 $dateToString 操作符将 date 转为年月日形态来分组
    // 
    .groupBy(db.dateToString({format: '%Y-%m-%d %H:00:00 +08', date: '$createdAt', timezone: '+08'}))
    .as('dateDay')
    .num()
    .as('num')
    // 聚合完成后对中间结果查询, 按照 totalSaleAmount 倒序排列
    .where()
    .sort({dateDay: 1})
    .find();

    let existMap = {}

    for (let item of result) {
      let timestap = new Date(item.dateDay).getTime()
      existMap[timestap] = item.num
    }



    let returnList = []
    let iterTime = xHourAgoTimestamp

    while(iterTime<=timeNowTimestamp) {
      let iterDate = new Date()

      let item = {
        timestamp: iterTime,
        date: new Date(iterTime).toLocaleString(),
        num: 0
      }

      if (iterTime in existMap) {
        item.num = existMap[iterTime]
      }

      returnList.push(item)

      iterTime+= 60 * 60 * 1000
    }

    return {
      code: 20000,
      msg: '获取成功',
      list: returnList
    }  
  
  }


}

// 导出 Service 的实例
module.exports = new DeviceService();

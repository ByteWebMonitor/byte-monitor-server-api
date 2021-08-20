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
  // 使用 where() 查询所有数据，使用 groupBy('type') 将查询数据按 type 分组，使用 sum('stock') 对 stock 字段求和
  let xDayAgoTimestamp = new Date().getTime()  - xDay* 24 * 60 * 1000
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
    .groupBy(db.dateToString({format: '%Y-%m-%d', date: '$createdAt', timezone: '+08'}))
    .as('dateDay')
    .num()
    .as('num')
    // 聚合完成后对中间结果查询, 按照 totalSaleAmount 倒序排列
    .where()
    .sort({dateDay: 1})
    .find();
  
    return result
  
  }

  



}

// 导出 Service 的实例
module.exports = new DeviceService();

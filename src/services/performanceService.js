const performanceTable = require('../models/performanceTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

class PerformanceService {

  
  async getAllItemList(app_id, skip, limit) {
    // 使用 inspirecloud.db.table 获取数据表
    const ItemList = await performanceTable.where({
      app_id: app_id
    })
        .sort({time: -1})// 使用 sort 指定按照 qty 逆序排序
        .skip(skip)// 使用 skip 跳过前 2 项
        .limit(limit)// 使用 limit 指定返回 2 项
        .find();
    const total = await performanceTable.where().count()
    return {
      ItemList: ItemList,
      total: total
    }
  }

  async create(performanceInfo) {
    return await performanceTable.save(performanceInfo);
  }

  async getRecentXMinNums(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let nums = await performanceTable.where({
      time: db.gt(xMinAgoTimesDate),
      app_id: app_id
    }).count()
    return nums
  }
  
  async statXMinAvg(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let statList = await performanceTable.where({
      time: db.gt(xMinAgoTimesDate),
      loadPageTime: db.gt(0),
      app_id: app_id,
    })
    .groupBy('app_id')
    .avg('dnsTime').as('dnsTime')
    .avg('loadPageTime').as('loadPageTime')
    .avg('redirectTime').as('redirectTime')
    .avg('reqTime').as('reqTime')
    .avg('ttfbTime').as('ttfbTime')
    .find();

    if (statList.length>0) {
      return {
        code: 20000,
        msg: '获取成功~',
        performance: statList[0]
      }
    } else {
        return {
        code: 20001,
        msg: '获取失败当前时间段内无记录',
        performance: null
      }
    }


  }
}

// 导出 Service 的实例
module.exports = new PerformanceService();

const errorTable = require('../models/errorTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

class ErrorService {

  async getAllItemList(app_id, skip, limit) {
    // 使用 inspirecloud.db.table 获取数据表
    const ItemList = await errorTable.where({
      app_id: app_id
    })
        .sort({time: -1})// 使用 sort 指定按照 qty 逆序排序
        .skip(skip)// 使用 skip 跳过前 2 项
        .limit(limit)// 使用 limit 指定返回 2 项
        .find();
    const total = await errorTable.where().count()
    return {
      ItemList: ItemList,
      total: total
    }
  }

  async create(errorInfo) {
    return await errorTable.save(errorInfo);
  }



  async getRecentXMinNums(app_id, xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let nums = await errorTable.where({
      time: db.gt(xMinAgoTimesDate),
      app_id: app_id
    }).count()
    return nums
  }

}

// 导出 Service 的实例
module.exports = new ErrorService();

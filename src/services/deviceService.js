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
  /**
   * 列出所有待办事项
   * @return {Promise<Array<any>>} 返回待办事项数组
   */
  async statAll() {
    // const all = await todoTable.where().find();
    // return all;
  }


  /**
   * 
   * @param {*} todo 
   */
  async create(device) {
    return await deviceTable.save(device);
  }
  /**
   * 删除一条待办事项
   * @param id 待办事项的 _id
   * 若不存在，则抛出 404 错误
   */


  async getRecentMin(min) {
    // const result = await todoTable.where({_id: ObjectId(id)}).delete();
    // if (result.deletedCount === 0) {
    //   const error = new Error(`todo:${id} not found`);
    //   error.status = 404;
    //   throw error;
    // }
  }

  async getRecentXMinNums(xMin) {
    let xMinAgoTimestamp = new Date().getTime()  - xMin * 60 * 1000
    const xMinAgoTimesDate = new Date(xMinAgoTimestamp)
    let nums = await deviceTable.where({
      createdAt: db.gt(xMinAgoTimesDate)
    }).count()
    return nums
  }

  async getAllItemList(skip, limit) {
    // 使用 inspirecloud.db.table 获取数据表
    const ItemList = await deviceTable.where()
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
  /**
   * 删除所有待办事项
   */
  async deleteAll() {
    // await todoTable.where().delete();
  }

  /**
   * 更新一条待办事项
   * @param id 待办事项的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
  }
}

// 导出 Service 的实例
module.exports = new DeviceService();

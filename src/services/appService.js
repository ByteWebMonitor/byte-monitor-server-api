const appTable = require('../models/appTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

/**
 * TodoService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class AppService {

  async isAppIdExist(app_id) {
  // 使用 where() 查询所有数据，使用 groupBy('type') 将查询数据按 type 分组，使用 sum('stock') 对 stock 字段求和
    let count = await appTable.where({
        app_id: app_id
    }).count()
    if (count>0){ 
        return true
    } else {
        return false
    }
  }

  async isAdminHasAppId(admin_name, app_id) {
  // 使用 where() 查询所有数据，使用 groupBy('type') 将查询数据按 type 分组，使用 sum('stock') 对 stock 字段求和
    let count = await appTable.where({
        admin_name: admin_name,
        app_id: app_id
    }).count()
    if (count>0){ 
        return true
    } else {
        return false
    }
  }

  async getAdminAppIdList(admin_name) {
    let result =await appTable.where({
        admin_name: admin_name
    }).find()
    return result
  }


  async adminAddAppId(admin_name, app_id, app_name, app_desc) {

    let count = await appTable.where({
        app_id: app_id
    }).count()
    if (count>0){ 
        return {
            code: 20001,
            msg: 'app_id已存在'
        }
    }

    let result = appTable.save({
        admin_name: admin_name,
        app_id: app_id,
        app_name: app_name,
        app_desc: app_desc
    })
    return {
        code: 20000,
        msg: 'app_id添加成功'
    }
  }




}
// 导出 Service 的实例
module.exports = new AppService();

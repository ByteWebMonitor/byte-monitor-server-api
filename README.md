# byte-monitor-server-api



```sh
inspirecloud deploy -m "Deploying a new feature."
```


## API接口说明

api地址：
https://qcgtsp.app.cloudendpoint.cn/api

### 调用API接口示例

```shell
npm install
```


```shell
node ./test/deviceServiceTest.js
node ./test/errorServiceTest.js
node ./test/performanceService.js
```


## 项目目录

```sh
project
  |- node_modules    # 该项目的依赖项的安装目录
  |- public          # 静态资源目录
  |- src             # 包含主要逻辑文件的目录，为 Koa 的工程文件
      |- controllers   # controller 是业务入口
      |- models        # model 负责数据操作
      |- routes        # route 是路由定义
      |- services      # service 是业务定义
      |- app.js        # app 是 Koa 实例定义
  |- index.js        # 云工程的入口文件
  |- inspirecloud.json  # 轻服务云工程配置文件
  |- package.json    # npm 的通用配置文件
  |- .gitignore      # Git 管理时标识忽略内容的文件
```

## 数据库表格设计

[数据库表格设计规约](./src/models/database.dbml)

```shell
dbdocs build ./src/models/database.dbml
```

https://dbdocs.io/vansin/byte_web_monitor


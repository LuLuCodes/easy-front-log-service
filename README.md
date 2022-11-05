<!--
 * @Author: leyi leyi@myun.info
 * @Date: 2022-06-18 19:57:22
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2022-11-03 20:34:58
 * @FilePath: /easy-front-log-service/README.md
 * @Description:
 *
 * Copyright (c) 2022 by leyi leyi@myun.info, All Rights Reserved.
-->

# 开发

本地调试时，请手动创建.env 文件，参考.env.production

# 部署

```shell
# 安装 pm2-intercom
pm2 install pm2-intercom

# 启动服务
pm2 start pm2.json
```

# pm2.json

```json
{
  "name": "easy-front-log-service-v8", // 服务名
  "script": "api/main.js", // 启动脚本
  "ignoreWatch": ["node_modules"],
  "instances": "2", // 启动进程数
  "watch": false,
  "merge_logs": true,
  "instance_var": "INSTANCE_ID",
  "env": {
    "NODE_ENV": "production"
  }
}
```

# MongoDB 安装

```shell
docker pull mongo:latest
```

```shell
docker run -d --name mongodb -p 27018:27017 -v /home/mongodb/datadb:/data/db --privileged=true --restart always mongo --wiredTigerCacheSizeGB 2.0 --auth

docker exec -it  mongodb  mongo admin
# mongo5.0以上，请执行 docker exec -it  mongodb  mongosh admin

db.createUser({ user: 'admin', pwd: 'Myun123jx', roles: [ { role: 'root', db: 'admin' },{ role: "userAdminAnyDatabase", db: "admin" } ] });

db.auth("admin","Myun123jx");

db.createUser({ user: 'myun', pwd: 'Myun123jx', roles: [ { role: "readWrite", db: "log-db" } ] });

db.auth("myun","Myun123jx");
```

# MongoDB 维护

## 进入容器

```shell
docker exec -it  mongodb  mongo admin
```

## 登录用户

```shell
db.auth("admin","Myun123jx");
```

## 清理磁盘(MongoDB 删除文档后，并不会主动释放空间)

```shell
use db_your_name
db.runCommand({ compact: 'collection_name'} )
```

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
docker run -d --name mongodb -p 27018:27017 -v /home/mongodb/datadb:/data/db --privileged=true --restart always mongo --auth
docker exec -it  mongodb  mongo admin
db.createUser({ user: 'admin', pwd: 'Myun123jx', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
db.auth("admin","Myun123jx");
db.createUser({ user: 'myun', pwd: 'Myun123jx', roles: [ { role: "readWrite", db: "trf-store-log-db" } ] });
db.auth("myun","Myun123jx");
```


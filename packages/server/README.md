# 目录解析

- dto：这里的 dto 也就是后端的 vo。java 的 dto 是后端的实体类，属性就是 sql 的各种字段。java 的 dao 就是 model 层，用来调用 sql 方法来查找数据然后存放到 dto 中，最后 service 处理 dto 数据，放到 vo 中返回给前端。对于前端来说，不太需要实体类的概念，因为可以直接 {} 创建一个对象，所以只需要定义数据类型就好。所以这里使用 dto 来表示接口参数类型。这里其实也可以用 interface 来搞，但是 nest 推荐用 class 来做，因为诸如 Pipes 等 nest 的特性需要在运行时可以访问到变量的类型，而 ts interface 在运行的时候已经消失了。所以区分开来。
- interface：表示返回值类型。
- model：查询数据。
- controller：路由。
- service：逻辑处理。
- module：nest 模块组成。

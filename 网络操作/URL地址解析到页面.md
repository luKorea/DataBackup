# 1. URL地址

1. DNS域名解析，将域名地址解析为IP地址:
   1. 浏览器DNS缓存
   2. 系统DNS缓存
   3. 路由器DNS缓存
   4. 网络运营商DNS缓存
   5. 递归搜索：blog.baidu.com
      1.  .com域名下查找DNS解析
      2. .baidu域名下查找DNS解析
      3. blog域名下查找DNS解析
      4. 出错了

2. TCP连接,TCP三次握手
   1. 第一次,, 浏览器发起，通知服务器我要发送请求
   2. 第二次, 服务器发起，通知浏览器我准备接受
   3. 打三次, 浏览器发起，马上发送

3. 发送请求
   1. 请求报文

4. 接受响应
   1. 响应报文

5. 渲染页面
   1. 遇见HTML标记，浏览器调用HTML解析器解析成Token并构建DOM树
   2. 遇见style/link标记，浏览器调用除上述解析器，处理css标记并构建CSSDOM树
   3. 遇见script标记，调用JavaScript解析器，处理script代码
   4. 将DOM树和CSS树合并成一个渲染树
   5. 根据渲染树来计算布局，计算节点的几何位置信息
   6. 将节点颜色绘制到页面中
      1. **注意**
         1. **多次调用，顺序不一定**

6. 断开连接，TCP四次挥手
   1. 第一次挥手，浏览器发起，发送给服务器，发送完请求报文
   2. 第二次挥手，服务器发起，接受完请求报文
   3. 第三次挥手，服务器发起，发送响应报文
   4. 第四次挥手，浏览器发起。接受响应报文
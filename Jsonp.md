# Jsonp

在前端开发中, 我们一种常见的网络请求方式就是JSONP
使用JSONP最主要的原因往往是为了解决跨域访问的问题.
JSONP的原理是什么呢?
JSONP的核心在于通过<script>标签的src来帮助我们请求数据.
原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的.
这个时候, 我们利用<script>标签的src帮助我们去服务器请求到数据, 将数据当做一个javascript的函数来执行, 并且执行的过程中传入我们需要的json.
所以, 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称.
JSONP如何封装呢?
我们一起自己来封装一个处理JSONP的代码吧

![1563175156541](C:\Users\Korea\AppData\Roaming\Typora\typora-user-images\1563175156541.png)

![1563175188342](C:\Users\Korea\AppData\Roaming\Typora\typora-user-images\1563175188342.png)

![1563175218301](C:\Users\Korea\AppData\Roaming\Typora\typora-user-images\1563175218301.png)
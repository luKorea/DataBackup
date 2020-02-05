1. ##### 小程序云开发调用HTTP请求中got第三方库使用失败解决方法

   1. 错误代码

      ```json
      {"errorCode":1,"errorMessage":"user code exception caught","stackTrace":"The \"original\" argument must be of type function"}
      ```

   2. 替换方案

      ```javascript
      // 云函数入口文件
      const cloud = require('wx-server-sdk')
      const rq = require('request-promise');
      cloud.init()
      
      // 云函数入口函数
      exports.main = async(event, context) => {
        let key = '你的聚合数据APPID',
          page = 2,
          pagesize = 20,
          sort = 'asc',
          time = '1418745237',
          url = `http://v.juhe.cn/joke/content/list.php?key=${key}&page=${page}&pagesize=${pagesize}&sort=${sort}&time=${time}`;
        return await rq(url)
        .then(res => res)
        .catch(err => err)
      }
      ```

      
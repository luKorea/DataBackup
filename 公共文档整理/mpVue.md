# 第一章： mpVue(Vue in Mini Program)

<hr>

## **1.1**	**简介**

1. 美团工程师推出的基于Vue.js封装的用于开发小程序的框架

2. 融合了原生小程序和Vue.js的特点

3. 可完全组件化开发

## **1.2**	**特点**

1. 组件化开发

2. 完成的Vue.js开发体验(前提是熟悉Vue)

3. 可使用Vuex管理状态

4. Webpack构建项目

5. 最终H5转换工具将项目编译成小程序识别的文件

## **1.3**	**初始化项目**

1. npm install vue-cli -g   下载vue脚手架
2. vue init mpvue/mpvue-quickstart my-project  初始化项目
3. cd my-project  进入项目根目录
4. npm install  根据package.json安装项目依赖包
5. npm start || npm run dev  启动初始化项目

# **第二章**   开启项目

<hr>

## 2.1		**注册小程序**

1. src/app.json   全局配置文件

2. src/App.vue   等同于原生小程序中的app.js, 可再次写小程序应用实例的声明周期	  函数 || 全局样式(style中编写)

3. main.js应用入口文件, 声明组件类型，挂载组件

## **2.2**		**入口文件介绍**

1. import Vue from 'vue'
2. import App from './App.vue'
3. // Vue.config.productionTip = false 默认为false，用于启动项目的时候提示信息，设置为false关闭提示
   Vue.config.productionTip = true
4. // 这个值是为了与后面要讲的小程序页面组件所区分开来，因为小程序页面组件和这个App.vue组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
   App.mpType = 'app'
5. // 生成Vue实例
   const app = new Vue(App)
6. // 挂载组件
   app.$mount()

## **2.3**		**编写页面 pages/index**

### **2.3.1**	**页面需要文件介绍**

1.	index.vue		等同于原生中的wxml + wxss + js

2.	main.js		当前组件页面的入口文件，用于生成当前组件实例，并挂载组件

3.	main.json		当前页面的局部配置文件(注意：index.vue组件最终会被转化为main.wxml以及main.wxss文件, 所以当前的json文件需命名main)
   4.	src源文件

![img](file:///C:\Users\Korea\AppData\Local\Temp\ksohtml6860\wps1.jpg) 

5. 自动打包后的dist文件

![img](file:///C:\Users\Korea\AppData\Local\Temp\ksohtml6860\wps2.jpg)

## **2.4 注意事项**

1. 在每个组件中都需要使用： 组件实例.$mount() 去挂载当前组件,否则对应的页面不能生效
2. npm run dev 每次会重新打包dist文件，测试只能在小程序工具上
3. mpvue中绑定小程序原生事件不能使用bind + 事件名，需要使用@事件名 且要定义在methods中否则不生效
4. 新创建的页面需要重新执行: npm run dev才能将新的页面打包到dist文件中

## **2.5**	**vue实例声明周期 && 小程序声明周期**

### **2.5.1**	**vue实例声明周期**

1. beforeCreate 实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
2. created  实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
3. beforeMount  在挂载开始之前被调用：相关的 render 函数首次被调用。
4. mounted  el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
5. beforeUpdate  数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
6. updated  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
7. beforeDestroy  实例销毁之前调用。在这一步，实例仍然完全可用。
8.destroyed  Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

### **2.5.2**	**小程序应用App实例声明周期**

1.  onLaunch: 小程序应用初始化
2.  onShow: 小程序启动获取后台进入前台
3.  onHide: 小程序应用从前台进入后台



### **2.5.3**	**小程序页面Page实例生命周期**

1. onLoad 监听页面加载
2. onShow: 页面显示
3. onReady: 监听页面初始化渲染完成
4. onHide: 监听页面隐藏，注意当前页面实例依然存活
5. onUnload: 监听页面卸载
6. onPullDownRefresh: 监听用户下载动作
7. onReachBottom: 监听用户上拉触底操作
8. onShareAppMessage: 用户点击右上角分享功能
9. onPageScroll: 页面滚动
10. onTabItemTap： 当前是 tab 页时，点击 tab 时触发

### **2.5.4 注意事项**

​			*除了 Vue 本身的生命周期外，mpvue 还兼容了小程序生命周期，这部分生命周期钩子的来源于[**微信小程序的 Page**](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html)， 除特殊情况外，不建议使用小程序的生命周期钩子。*

# **第三章**  **mpvue中使用vue-router && axios**

<hr>

## **3.1**		**vue-router**

1. 在mpvue中对vue-router的支持不好,问题较多

2. 进行页面跳转的是可使用小程序提供的API

   (1) wx.navigateTo()  保留当前页面，可回退

   (2) wx.redirectTo()  不保留，不能回退

   (3) wx.switchTab()  使用于tabBar页面

## **3.2**		**axios** 

1. 小程序中不支持使用axios，会报错： XMLHttpRequest is not a constructor

2.	原因: 小程序的环境和浏览器的环境不一样

3. 解决方法: 使用其他库: flyio

## **3.3**		**fly使用教程**

### **3.3.1  gitHub地址**

 https://github.com/wendux/fly

### **3.3.2**	**使用步骤**

​		1) 下载: npm install flyio

​		2) 引入: import Fly from ‘flyio/dist/npm/wx’ 注意flyio支持很多环境下使用

​		3) 生成实例: let fly = new Fly

​		4) 配置: Vue.prototype.$fly = fly

​		5) 使用: 组件中 this.$fly.get()

# **第四章**  **mpvue VS 小程序 状态管理**

<hr>

## **1.1** 	**原生小程序**

​			1) 在data中初始化状态数据

​			2) 修改状态: this.setData({key: value})

​			3) 页面公共状态： 

​				a. App程序实例的data中定义

​				b. 获取状态数据: let datas = getApp()

​				c. 修改状态数据: datas.data.xxx = value

​			4) 或者利用storage本地存储

## **1.2**  **Mpvue**

​			1) 在组件中通过getApp无法拿到对应的数据

​			2) mpvue中支持vuex，所以可以使用**vuex**集中管理状态

​	 	   3) vuex几个重要的概念:

​				a. store对象

​				b. dispatch() 分发状态

​				c. actions	携带参与修改状态的数据，并触发mutations

​				d. mutations用于修改状态，并将状态交给store对象

​				e. getter 用于动态计算状态

# **第五章** **原生小程序 VS mpvue 对比总结**

<hr>

​		1) 原生小程序运行更稳定些, 兼容性好，mpvue可能在某些方面存在兼容性问题（vue-router）

​		2) mpvue支持vue组件化开发. 效率更高，功能更强大(双向数据绑定, vuex)

​		3) mpvue可基于webpack组件化, 工程化开发

​		4) 原生不支持npm安装包，不支持css预处理

​		5) 支持 computed 计算属性和 watcher 监听器；模板语法中只支持简单的 js 表达式。可以直接写 div 、span 等标签 
computed 的写法

​		6) 之前会vue的工程师上手mpvue框架的成本较低
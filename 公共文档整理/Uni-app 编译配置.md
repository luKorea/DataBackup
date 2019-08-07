# Uni-app 编译配置

```javascript
	<!-- #ifdef H5 -->
	<view>只在H5编译</view>
	<!-- #endif -->
	
	<!-- #ifdef APP-PLUS -->
	<view>只在Android/IOS端编译</view>
	<!-- #endif -->
	
	<!-- #ifdef MP -->
	<view>只在小程序（百度，蚂蚁金服，百度）端编译</view>
	<!-- #endif -->
	
	<!-- #ifdef MP-ALIPAY -->
	<view>蚂蚁金服</view>
	<!-- #endif -->
	
	<!-- #ifdef MP-MP-WEIXIN -->
	<view>微信</view>
	<!-- #endif -->
	
	<!-- #ifdef MP-MP-BAIDU -->
	<view>百度</view>
	<!-- #endif -->
	
	<!-- #ifdef MP-QQ -->
	<view>QQ</view>
	<!-- #endif -->
    
    <!-- #ifdef MP-TOUTIAO -->
	<view>头条</view>
	<!-- #endif -->
    
	<!-- #ifndef MP -->
	<view>不在小程序编译</view>
	<!-- #endif -->
```


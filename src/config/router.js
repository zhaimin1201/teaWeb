'use strict';//使用严格模式

//stateProvider对路由进行配置   urlRouterProvider对路径进行配置  
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	})
	.state('shop',{
		url:'/shop_tea',
		templateUrl:'view/shop.html',
		controller:'headCtrl'
	})
	;
	
	//当其他都没有匹配，默认跳到main
	$urlRouterProvider.otherwise('main');
}])
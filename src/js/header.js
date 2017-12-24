'use strict';//使用严格模式
var dmpControllers = angular.module('HeaderController', ['dmpServices']);
dmpControllers.controller('headCtrl',headCtrIn);
/*依赖注入*/
headCtrIn.$inject=["$scope","$state","$rootScope","service","$interval"];
function headCtrIn($scope,$state,$rootScope,service,$interval){
	$scope.buy = function () {
		console.log(1111);
		$state.go("shop");
	}
}


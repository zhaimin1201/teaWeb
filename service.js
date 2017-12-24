'use strict';

/**
 * Created by liujun on 17/6/6.
 * services
 */

var dmpServices = angular.module('dmpServices', ['ngResource']);

dmpServices.factory('service', appStart_dateIn);
appStart_dateIn.$inject = ['$http','$q'];
function appStart_dateIn($http,$q) {
	console.log($http);
    return {
        httpRequest:function(address, data, type, config) {
            var deferred = $q.defer();
            var server = "http://114.67.224.249";
			console.log(address);
            console.log(data);
            console.log(type)
            var formatDataToString = function(){
                var dataString = "";
                if((typeof data)=='string')
                    dataString = data;
                else if((typeof data)=='object'){
                    var dataList = Object.getOwnPropertyNames(data);
                    for(var i=0;i<dataList.length;i++){
                        dataString += dataList[i] +"="+ eval('data.'+dataList[i])+"&";
                    }
                }else if(data == ""){

                }else{
                    console.error('请求参数格式不准确');
                    dataString = "";
                }
                return dataString;
            }
            if((server==""||server==undefined)&&(address==""||address==undefined)){
                console.error('请求URL为空');
                return false;
            }else if(address==undefined){
                address = "";
            }
            if(type){
                if(type=='get'||type=='GET'||type=='Get'){
                    $http.get(server+address+'?'+formatDataToString()+'callback=JSON_CALLBACK',{
                            crossDomain:true,
                            xhrFields:{
                                withCredentials: true,
                            }})
                        .success(function(data,status,headers,config){
                            deferred.resolve(data,status,headers,config);
                        })
                        .error(function(data,status,headers,config){
                            deferred.reject(data,status,headers,config);
                        })
                    return deferred.promise;
                }else if(type=='post'||type=='POST'||type=='Post'){
                    //暂用ajax 带cooke + 跨域
                }else if(type=='jsonp'||type=='Jsonp'||type=='JSONP'){
                    $http.jsonp(server+address+'?'+formatDataToString()+'callback=JSON_CALLBACK',{withCredentials: true})
                        .success(function(data,status,headers,config){
                            ////console.log(status)
                            deferred.resolve(data,status,headers,config);
                        })
                        .error(function(data,status,headers,config){
                            ////console.log(status)
                            deferred.reject(data,status,headers,config);
                        })
                    return deferred.promise;
                }
            }else{
                $http.get(server+address+'?'+formatDataToString()+'callback=JSON_CALLBACK',{withCredentials: true})
                    .success(function(data,status,headers,config){
                        ////console.log(status)
                        deferred.resolve(data,status,headers,config);
                    })
                    .error(function(data,status,headers,config){
                        ////console.log(status)
                        deferred.reject(data,status,headers,config);
                    })
                return deferred.promise;
            }
        }
    }
}

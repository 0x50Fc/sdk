"use strict";var requestUrl=require("../../../../config").requestUrl,duration=2e3;Page({onShareAppMessage:function(){return{title:"网络请求",path:"page/API/pages/request/request"}},makeRequest:function(){var s=this;s.setData({loading:!0}),wx.request({url:requestUrl,data:{noncestr:Date.now()},success:function(e){wx.showToast({title:"请求成功",icon:"success",mask:!0,duration:duration}),s.setData({loading:!1}),console.log("request success",e)},fail:function(e){var t=e.errMsg;console.log("request fail",t),s.setData({loading:!1})}})}});
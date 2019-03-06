V(element,data,"body",{"layout":"relative","width":"100%","height":"100%","background-color":"#ffffff"},function(element,data){
	V(element,data,"page",{"kk:for":E(function(items){ return (items); },["items"]),"width":"100%","height":"100%","margin":E(function(bottombar){ return "0px 0px "+(bottombar.height)+" 0px"; },["bottombar"]),"hidden":E(function(index,selectedIndex){ return (index!=selectedIndex); },["index","selectedIndex"]),"path":"@wx/page/page.js","data-appid":E(function(appid){ return (appid); },["appid"]),"data-path":E(function(item){ return (item.pagePath); },["item"])},function(element,data){
	});
	V(element,data,"view",{"bottom":"0px","width":"100%","height":E(function(bottombar){ return (bottombar.height); },["bottombar"]),"padding":E(function(bottombar){ return (bottombar.padding); },["bottombar"])},function(element,data){
		V(element,data,"view",{"kk:for":E(function(items){ return (items); },["items"]),"width":E(function(items){ return (100/items.length)+"%"; },["items"]),"height":"100%","left":E(function(index,items){ return (index*100/items.length)+"%"; },["index","items"]),"ontap":"onTabAction","data-index":E(function(index){ return (index); },["index"])},function(element,data){
			V(element,data,"image",{"width":"24px","height":"24px","top":"8rpx","hidden":E(function(index,selectedIndex){ return (index==selectedIndex); },["index","selectedIndex"]),"src":E(function(basePath,item){ return (basePath+"/"+item.iconPath); },["basePath","item"])},function(element,data){
			});
			V(element,data,"image",{"width":"24px","height":"24px","top":"8rpx","hidden":E(function(index,selectedIndex){ return (index!=selectedIndex); },["index","selectedIndex"]),"src":E(function(basePath,item){ return (basePath+"/"+item.selectedIconPath); },["basePath","item"])},function(element,data){
			});
			V(element,data,"text",{"font":"24rpx","style":"color: #ddd;","style:selected":"color: #333;","status":E(function(index,selectedIndex){ return (index==selectedIndex?"selected":""); },["index","selectedIndex"]),"bottom":"4rpx","#text":E(function(item){ return (item.text); },["item"])},function(element,data){
			});
		});
		V(element,data,"view",{"width":"100%","height":"1rpx","top":"0px","background-color":"#e5e5e5"},function(element,data){
		});
	});
});

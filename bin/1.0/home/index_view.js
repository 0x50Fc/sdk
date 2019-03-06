V(element,data,"body",{"layout":"relative","width":"100%","height":"100%","background-color":"#ffffff"},function(element,data){
	V(element,data,"scroll",{"width":"100%","height":"100%","layout":"flex","overflow-x":"hidden","padding":E(function(topbar){ return (topbar.padding); },["topbar"])},function(element,data){
		V(element,data,"view",{"reuse":"item","width":"100%","height":"120rpx","padding":"20rpx","kk:for":E(function(items){ return (items); },["items"]),"data-type":E(function(item){ return (item.type); },["item"]),"data-path":E(function(item){ return (item.path); },["item"]),"ontap":"onTapAction","style:hover":"opacity: 0.6","style":"opacity: 1.0"},function(element,data){
			V(element,data,"text",{"font":"32rpx","color":"#000","left":"0px","#text":E(function(item){ return (item.title); },["item"])},function(element,data){
			});
			V(element,data,"view",{"width":"100%","height":"1rpx","background-color":"#e5e5e5","bottom":"-20rpx"},function(element,data){
			});
		});
	});
});

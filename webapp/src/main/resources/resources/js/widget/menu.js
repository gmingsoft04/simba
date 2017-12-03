define(["widget/factory","jquery"],function(widget,$){
	
	widget.define("menu",{
		template:"<h1>Hello this navbar Widget</h1>", 
		templateUri:"js/widget/menu.html",
		resources:{
			css:["../css/lib/metisMenu.css"] 
		},
		init:function(){
			
		},
		loadData:function(){
			
		},
		beforeRender:function(html){
			return html;
		},
		afterRender:function(){
			// 定义一个异步对象
			var dtd = $.Deferred();
			
			require(["lib/metisMenu"],function(m){
				 $('.side-nav .metismenu').metisMenu({ toggle: true }); 
				 // resolve 会触发 done 的回调，reject 触发 fail 回调 
				 dtd.resolve();
			});
			
			// 返回
			return dtd.promise();//此处也可以直接返回dtd，区别在于Deferred 对象有resolve,reject,notify而promise只能设置done/fail函数
		},
		ready:function(){ 
			// 加载点击事件
			
		},
		destory:function(){
			
		}
	
	});
	
});
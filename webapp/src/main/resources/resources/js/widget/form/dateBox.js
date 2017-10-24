define(["widget/factory","jquery","jquery.datetimepicker"],function(widget,$){
	
	var defulatConfig = {
		format:"yyyy-MM-dd"
	};
	
	widget.define("form.DateBox",{ 
		templateUri:"js/widget/form/dateBox.html",
		resources:{
			css:["../css/lib/bootstrap-datetimepicker.css"] 
		}, 
		init:function(){
			
		},
		loadData:function(){
			
		},
		beforeRender:function(html){
			return html;
		},
		afterRender:function(){  
			 this.$dom.datetimepicker({
				    fontAwesome:true,
				    format: 'yyyy-mm-dd',//'yyyy-mm-dd hh:ii',
			        autoclose: true,
			        todayBtn: true,
			        //startDate: "2013-02-14 10:00",
			        //minuteStep: 10
			        minView:"month" // month 可以选择到日， day:可以选择到小时
			 }); 
			 
		},
		ready:function(){
			
		},
		destory:function(){
			
		} 
	});
	
});
// TODO: 1.pageContext 需要预加载 ，2.widget/data/datable 需要在使用时加载
require(["rt/pageContext","widget/data/datatable"],function(pageContext){
	pageContext.define("admin.sitemap.layout",function(page){
		
		page.ready = function(){
			var gridOption = {
				
				pageOp:{
					el:"#pageDemo",
					pageSize:15,
					curPage:1
				},
				cols:[{
					field:"username",
					header:"用户名",
					width:100,
					renderer:function(value,record,columnOp){
						return "<a>"+value+"</a>";
					},
					editor: function(){
						return "<input>";
					}
				}]	
			};
			
			// 绑定表格
			$("#tableDemo").xWidget("datatable",gridOption);
			
			
		}
		
	});
});
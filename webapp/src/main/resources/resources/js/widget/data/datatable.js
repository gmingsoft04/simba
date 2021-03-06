define(["widget/factory","jquery","jqueryui","template","rt/util"],function(widget,$,$ui,tmpl,util){
	// 预处理数据行渲染模版
	/*
	 	'<%if(colOp.renderer){ %>' + 
					'<%=# colOp.renderer(fieldValue,dataItem,colOp) %>' + 
				'<%}else{%>' +
					'<%= fieldValue %>' + 
				'<%}%>' + 
	 */
	var _dataRowTemplate = 
		'<%  for(var j=0;j<$widget._data.length;j++){ var dataItem = $widget._data[j]; %>' +
		'<tr data-row-index="<%=j%>"> ' +
			'<% if($widget.showSeq !== false){%>' +
			'	<th><span><%=(j+1)%></span></th>' +
			'<%}%>' + 
			'<% if($widget.selectMode == "mutli"){%>' + 
			'<td><span><input type="checkbox" /></span></td>' + 
		'<%}%> ' + 
		
		'<% ' + 
			'for(var i=0;i<$widget.columns.length;i++){ ' + 
				'var colOp = $widget.columns[i];' +
				'var field = colOp.field;' +
				'var fieldValue = field ? dataItem[field] : null;' + 
		'%>' + 
			'<td data-field="<%=field%>">' + 
				'<span class="table-td-text" style="width:<%= (colOp.width || 150)-17 %>px; min-width:<%= (colOp.width || 150)-17 %>px;" data-toggle="tooltip" title="Example tooltip">' + 

				'</span>' + 
			'</td>' + 
		'<%}%>   ' + 
		'</tr>' + 
		'<%}%> ';
	tmpl('datatable-datarows',_dataRowTemplate);
	
	
	var defaultTreeOp = {
			
	}
	
	widget.define("datatable",{
		template:"<h1>Hello this navbar Widget</h1>", 
		templateUri:"js/widget/data/datatable.html",
		init:function(){
			// 初始化表格，列部分参数
			// 计算表格总宽度
			var _op = this.op;
			console.log("init datatable",_op);
			
			var tableWidth = 0;
			for(var i=0;i<_op.columns.length;i++){
				var colOp = _op.columns[i];
				tableWidth += colOp.width || 150;
				// TODO:如果是操作类型，暂且设置下字段，防止渲染单元格出问题，后续可能会进行优化, _bindCellData
				if(colOp.type == 'operate'){
					colOp.field="__operate"+i;
				}
			}
			
			_op["_tableWidth"] = tableWidth;
			// 初始化树选项
			if(this.op.treeOp){ 
				this.op._treeColumn = $.extend(this._getColumnOp(this.op.treeOp.field),{ treeField:true });  
			} 
		},
		loadData:function(){
			
		},
		beforeRender:function(html){
			return html;
		},
		afterRender:function(){
			var self = this;
			var $tableHead = this.$dom.find(".table-scroll-header:eq(0)");
			var $tableBody = this.$dom.find(".table-scroll-body:eq(0)");
			
			
			
			// TODO:检查是否存在需要绑定事件或操作的行
			//$tableDataRows.html(rowHtml);
			
			//this.$dom.find("th").resizable();
			/*this.$dom.find(".table-th-resize").on("mousedown",function(e){ 
				console.log("mouse down",e);
				var $this = $(this);
				var $th = $this.closest("th");
				
				// 清理，重新绑定事件
				$this.off("mousemove mouseup");
				
				$this.data("srcPageX",e.pageX);
				$this.on("mousemove",function(e){ 
					var pageX = e.pageX;
					var srcPageX = $(this).data("srcPageX");
					var $th = $(this).closest("th");
					var width = $th.width();
					console.log("move",pageX ,srcPageX, width,e); 
					$th.width(pageX - srcPageX + width);
				});
				
				$this.on("mouseup",function(e){
					console.log("mouse up",e);
					$(this).un("mousemove").un("mouseup"); 
				})
				
			})*/
			
			// 绑定滚动条事件 
			$tableBody.on("scroll",function(){ 
				var bodyScrollLeft = $(this).scrollLeft(); 
				$tableHead.scrollLeft(bodyScrollLeft);
			}); 
			
			// 初始化提示框
			//$tableBody.find("tr>td>span",function(){
				
			//});  
			if(this.op.operation){
				var _oper = this.op.operation;
				if(_oper.search && _oper.search.btn){
					util.el(_oper.search.btn).on("click",function(){
						self.reload();
					});
				}
			}
			
			if(this.op.autoLoad !== false) {
				self.reload();
			}
		},
		ready:function(){ 
		},
		destory:function(){
			
		},
		_getColumnOp:function(field){
			var _cols = this.op.columns;
			if($.isNumeric(field)) return _cols[field];
			if(typeof field == 'string'){
				for(var i=0;i<_cols.length;i++){
					var col = _cols[i];
					if(col && col["field"] == field){
						return col;
					}
				}
				throw 'no found column op ['+field+']';
			}
			return 'getColumnOp arguments not support';
		},
		showMessage:function(html){
			var $messageBody = this.$dom.find(".table-message-body:eq(0)");
			$messageBody.html(html);
			this.$dom.find(".table-message:eq(0)").show(); 
		},
		hideMessage:function(){
			this.$dom.find(".table-message:eq(0)").hide();
		}, 
		_treeRowsExpand:function($row,isExpand){ 
			var self = this;
			var _row = $row.is("tr") ? $row : $row.closest("tr");
			var _rcd = _row.data("record");
			var _treeOp = this.op.treeOp;
			
			var $childrenRows = this.$dom.find("tr[data-tree-parent={0}]".format(_rcd[_treeOp.idKey]));
			$childrenRows.each(function(){
				var $childTr = $(this);
				if($childTr.is("[data-tree-expand=true]")){ 
					self._treeRowsExpand($childTr,isExpand);
				}
				$childTr[isExpand ? "show" : "hide"](); 
			});  
		},
		_renderTreeRows:function($rows,records){
			var _self = this;
			var _treeOp = this.op.treeOp;
			// 初始化行
			// 加载树字段内容
			if(_treeOp){  
				$rows.find("td[data-field={0}] span".format(this.op._treeColumn.field)).each(function(n,i){ 
					var $td = $(this);
					var $row = $td.closest("tr");
					$td.css("text-align","left");
					$td.css("padding-left",(+$row.data("treeLevel") * 20) + "px")
					
					var record = $row.data("record"); 
					var $folderIcon = $('<i class="fa {0}"></i>'.format(record._isLeaf ? "fa-file-o" : "fa-folder"));
					if(!record._isLeaf){
						$folderIcon.on("click",function(){
							var $this = $(this); 
							$this.toggleClass2("fa-folder","fa-folder-open",function(curr,el){
								//debugger
								var record = el.closest("tr").data("record"); 
								// 当前是打开文件命令
								if("fa-folder-open" == curr){
									$row.attr("data-tree-expand",true); 
									// 如果当前行是已经初始化过的，则直接展示或隐藏子项
									if($row.is("[data-tree-init=true]")){ 
										_self._treeRowsExpand($row,true);
										return;
									}
									var tempData = $.extend({},_self.op,{ "_data" : record.children });
									var rowHtml = tmpl('datatable-datarows',{ $win:window,$widget:tempData });
									var $tempRows = $(rowHtml);  
									
									// 在行上绑定数据 
									$tempRows.each(function(i,n){  
										var _rowData = tempData._data[i];
										$(this).attr("data-tree-parent",_rowData[_treeOp.pIdKey || 'parentId'])
										.attr("data-tree-level",+$row.data("treeLevel") + 1)
										.attr("data-tree-expand",false)
										.data("record",_rowData);
										_self._bindCellData($(this),_rowData);
									});
									_self._renderTreeRows($tempRows); 
									// 打开节点
									$row.after($tempRows);
									$row.attr("data-tree-init",true);
									//_self._treeRowsExpand($row,true);
								}else{
									// 关闭节点，找到所有未隐藏的子节点进行隐藏处理
									$row.attr("data-tree-expand",false);
									_self._treeRowsExpand($row,false);
								}
							}) 
						});
					}
					
					$td.prepend($folderIcon);
				});
			}
		},
		getRowData:function(rowIndex){
			return this.op._data[rowIndex];
		},
		// 绑定单元格数据
		_bindCellData:function($row,record){
			var _self=this;
			$row.find("[data-field]").each(function(){ 
				var $cell = $(this);
				var field = $cell.data("field");  
				// 字段属性为空值时不进行初始化
				if(field == '') return;
				
				if(typeof record[field] !== 'undifined'){
					var colOp = _self._getColumnOp(field);
					var value = record[field];
					if(colOp.renderer){
						// 渲染数据
						var renderValue = colOp.renderer(value,record,colOp,$cell.find(".table-td-text"));
						// 如果返回值不为 undefined 则进行渲染，控件设置方也可以使用$cell自己来社会资单元格内容,如果人为渲染了内容又返回了内容则会用返回的内容替换手动渲染的内容
						if(typeof renderValue !== 'undefined'){
							$cell.find(".table-td-text").html(colOp.renderer(value,record,colOp,$cell));
						}
					}else{
						$cell.find(".table-td-text").html(value);
					} 
				}
			});
		},
		reload:function(){
			var _self = this;
			
			// 加载数据
			var $tableDataRows = this.$dom.find(".datatable-rows:eq(0)");
			
			// TODO:待后续替换成选中数据tbody区域，添加加载框
			this.showMessage("<i class='fa fa-spinner fa-spin'></i><p>正在加载...</p>"); 
			
			var dataset = this.op.dataset;
			// 如果当前有设置查询参数区域
			var searchPanel = util.getObj(this,"op.operation.search.panel");
			if(searchPanel != null && typeof dataset == 'string'){
				var data = util.el(searchPanel).jsonData();
				dataset = { url:dataset, data:data }
			}else if(!$.isArray(dataset)){ // 并且不是静态数据
				throw '存在查询条件区域，但是数据集不是URL请求，暂时未实现其他数据集+查询条件的处理逻辑';
			}
			
			util.getDataset(dataset).done($.proxy(function(data){  
				if(!data || data.length == 0){ 
					_self.showMessage('<i class="fa fa-info"></i> <p>没有匹配的记录</p>');
					$tableDataRows.html("");
					return;
				}
				
				if(data && data.page && data.result){
					this.op._page = data.page;
					this.op._data = data.result;
				}else{
					this.op._data = data; 
				}
				
				
				// 加载分页内容
				if(this.op.pageOp !== false && this.op._page){
					require(["widget/data/pager"],function(pager){
						var $tableBody = _self.$dom.find(".table-scroll-body");
						var $pageEl = $tableBody.siblings(".pageContainer");
						if(!$pageEl.length){
							  $pageEl = $("<div class='pageContainer'></div>");
							  $tableBody.after($pageEl);
						}
						$pageEl.xWidget("pager",$.extend(true,_self.op.pageOp,_self.op._page));
					})
				}
				
				
				// 如果是树结构表格，则配置，同步树（默认），异步树，来格式化和显示节点信息，同步树表格不进行翻页
				var _treeOp = this.op.treeOp;
				if(_treeOp){ 
					// 根据树表格参数，重写数据格式 <i class="fa fa-file-o"></i> 
					this.op._data = util.toTree(data,_treeOp.rootPid,_treeOp.idKey,_treeOp.pIdKey);
				}
				var rowHtml = tmpl('datatable-datarows',{ $win:window,$widget:this.op });
				var $rows = $(rowHtml);  
				
				// 在行上绑定数据 
				$rows.each(function(i,n){ 
					var _rowData = _self.op._data[i];
					$(this).data("record",_rowData);
					_self._bindCellData($(this),_rowData);
					if(_treeOp) {
						$(this).attr("data-tree-parent","root");
						$(this).attr("data-tree-level",0);
					}
				});
				
				_self._renderTreeRows($rows);
				 
				$tableDataRows.html($rows); 
				_self.hideMessage(); 
			},this)).fail(function(){
				// TODO:清空数据 ，待优化显示效果 
				_self.showMessage('<i class="fa fa-bolt"></i> <p>数据获取失败</p>');
			}); 
		}
	
	});
	
});
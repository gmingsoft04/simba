define([],function(){ 
	var _toString = Object.prototype.toString;
	var _slice = Array.prototype.slice; 

	var isFunction = function(obj){
		return typeof obj === 'function';
	}
	
	var _addProto = function(target,funcName,func){
		var _proto = null;
		if(!isFunction(target)) throw 'arguments error';
		_proto = target.prototype;
		if(_proto[funcName]) throw 'target include this arguments';
		_proto[funcName] = func;
	}; 
	
	// 通用扩展 
	// 以XX开始
	var oldStartsWith = String.prototype.startsWith;
	String.prototype.startsWith = function(start,igroneCase){ 
		var ig = igroneCase || false ,_this = ig ?  this.toLowerCase() : this ,_start = ig ? start.toLowerCase() : start;
		return oldStartsWith ?  oldStartsWith.call(_this,_start) : this.indexOf(_start) === 0; 
	}
	
	// 以XX结尾
	var oldEndsWith = String.prototype.endsWith;
	String.prototype.endsWith = function(end,igroneCase){ 
		var ig = igroneCase || false ,_this = ig ?  this.toLowerCase() : this ,_end = ig ? end.toLowerCase() : end;
		return oldEndsWith ?  oldEndsWith.call(_this,_end) : (_this.lastIndexOf(_end) === (_this.length-_end.length));
	}
	
	// 字符串格式化，可以是{0},{1}这种占位符，也可以是:fieldName或者{fieldName}这种占位符，但是同一时间只支持一种
	String.prototype.format = function(){
	    var args = arguments;
	    return this.replace(/\{(\d+)\}/g,function(m,i,o,n){
	        return args[i];
	    });
	}
	
	// 多字符分割
	String.prototype.multiSplit = function(){
		var args=_slice.call(arguments).unique();
		var tempArray = [],result=[this];
		for(var i=0,j=args.length;i<j;i++){
			for(var k=0,v=result.length;k<v;k++){
				tempArray = tempArray.concat(result[k].split(args[i]));
			} 
			result=tempArray;
			tempArray = [];
		}
		return result;
	}
	
	// 字符串转日期
	String.prototype.toDate = function(){
		if(/^\d+$/.test(this)) return new Date(parseInt(this));
		if(/$(\d{4}-\d{1,2}-\d{1,2})/.test(this)){
			var da = this.multiSplit(" ","-",":")
			return new Date(da[0],da[1],da[2],da[3]||0,da[4]||0,da[5]||0);  
		}
		throw 'string to date invalid';
	}
	
	// 数值转日期
	Number.prototype.toDate = function(){
		return new Date(this);
	}
	
	// 日期转字符串
	Date.prototype.format = function(fmt) { 
	     var o = { 
	        "M+" : this.getMonth()+1,                 // 月份 
	        "d+" : this.getDate(),                    // 日 
	        "h+" : this.getHours(),                   // 小时 
	        "m+" : this.getMinutes(),                 // 分 
	        "s+" : this.getSeconds(),                 // 秒 
	        "q+" : Math.floor((this.getMonth()+3)/3), // 季度 
	        "S"  : this.getMilliseconds()             // 毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	    for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	        }
	    }
	    return fmt; 
	}     
	
	Date.prototype.trunc = function(){
		
	};
	
	Date.prototype.add = function(value,unit){
		
	};
	
	// 数组去从
	Array.prototype.unique = function(){
		var tempMap = {};
		for(var i=0,j=this.length;i<j;i++){
			tempMap[this[i]] = 1; 
		}
		return Object.keys(tempMap);
	}
	
	// 数组包含
	Array.prototype.contains = function(){
		var args=_slice.call(arguments).unique();
		var i=0,j=this.length,k=0,v=args.length,tempObj={}; 
		for(i=0;i<j;i++){ 
			var iv = this[i];
			for(k=0;k<v;k++){
				if(iv === args[k]) {
					tempObj[args[k]] = 1; 
				}
			}
		}
		return Object.keys(tempObj).length === v;
	}  
	
	var getType = function(arg){
		_toString(arg)
	}
	
	var isJson = function(str){ 
		try{
			JSON.parse(str);
			return true;
		}catch(e){
			return false;
		} 
	}
	
	var isDate = function(obj){
		return obj instanceof Date;
	}
	
	var isNumeric = function(obj){
		return !isNaN(parseFloat(obj)) && isFinite( obj );
	}
	
	var trunc = function(obj,format){
		if(isDate(obj)){
			
			return obj;
		}
		
		if(isNumeric(obj)){
			
			return obj;
		}
		throw 'no support obj type by trunc';
	}
	
	// 事件处理 
	
	// 
	var isEmpty = function(){
		
	}
	
	var getObj = function(){
		
	}
	return { 
		getString:_toString(),
		_slice:_slice, 
		trunc:trunc
	};
});
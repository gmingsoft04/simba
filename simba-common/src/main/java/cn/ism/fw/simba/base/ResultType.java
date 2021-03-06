package cn.ism.fw.simba.base;

/**
 * 结果类型枚举
  HTTP 400 - 请求无效 
  HTTP 401.1 - 未授权：登录失败 
  HTTP 401.2 - 未授权：服务器配置问题导致登录失败 
  HTTP 401.3 - ACL 禁止访问资源 
  HTTP 401.4 - 未授权：授权被筛选器拒绝 
  HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败 
  HTTP 403 - 禁止访问 
  HTTP 403 - 对 Internet 服务管理器 的访问仅限于 Localhost 
  HTTP 403.1 禁止访问：禁止可执行访问 
  HTTP 403.2 - 禁止访问：禁止读访问 
  HTTP 403.3 - 禁止访问：禁止写访问 
  HTTP 403.4 - 禁止访问：要求 SSL 
  HTTP 403.5 - 禁止访问：要求 SSL 128 
  HTTP 403.6 - 禁止访问：IP 地址被拒绝 
  HTTP 403.7 - 禁止访问：要求客户证书 
  HTTP 403.8 - 禁止访问：禁止站点访问 
  HTTP 403.9 - 禁止访问：连接的用户过多 
  HTTP 403.10 - 禁止访问：配置无效 
  HTTP 403.11 - 禁止访问：密码更改 
  HTTP 403.12 - 禁止访问：映射器拒绝访问 
  HTTP 403.13 - 禁止访问：客户证书已被吊销 
  HTTP 403.15 - 禁止访问：客户访问许可过多 
  HTTP 403.16 - 禁止访问：客户证书不可信或者无效 
  HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效 HTTP 404.1 - 
  无法找到 Web 站点 
  HTTP 404- 无法找到文件 
  HTTP 405 - 资源被禁止 
  HTTP 406 - 无法接受 
  HTTP 407 - 要求代理身份验证 
  HTTP 410 - 永远不可用 
  HTTP 412 - 先决条件失败 
  HTTP 414 - 请求 - URI 太长 
  HTTP 500 - 内部服务器错误 
  HTTP 500.100 - 内部服务器错误 - ASP 错误 
  HTTP 500-11 服务器关闭 
  HTTP 500-12 应用程序重新启动 
  HTTP 500-13 - 服务器太忙 
  HTTP 500-14 - 应用程序无效 
  HTTP 500-15 - 不允许请求 global.asa 
  Error 501 - 未实现 
  HTTP 502 - 网关错误 
 * @since 2017年7月29日
 * @author Administrator
 */

public enum ResultType {

	/**
	 * 成功
	 */
	SUCCESS("200", "访问成功"),
	/**
	 * 错误
	 */
	FAILURE("400", "请求错误"),
	/**
     * 错误
     */
    ERROR_PARAMS("412", "参数错误"),
	/**
	 * 异常
	 */
	EXCEPTION("500", "系统异常");

	private String code;

	private String message;

	private ResultType(String c, String m) {
	    code = c;
		message = m;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

}

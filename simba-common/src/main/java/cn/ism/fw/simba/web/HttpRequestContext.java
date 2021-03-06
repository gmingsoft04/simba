package cn.ism.fw.simba.web;

import javax.servlet.http.HttpServletRequest;

import cn.ism.fw.simba.context.UserPrincipal;
import cn.ism.fw.simba.context.RequestContext;

public class HttpRequestContext extends RequestContext {

	private HttpServletRequest request;

	public HttpRequestContext(){
		
	}
	
	public HttpRequestContext(HttpServletRequest request) {
		setRequest(request);
	}

	public HttpRequestContext(HttpServletRequest request,UserPrincipal user) {
		setUser(user);
		setRequest(request);
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	 
}

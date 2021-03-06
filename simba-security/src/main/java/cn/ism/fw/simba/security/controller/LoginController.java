package cn.ism.fw.simba.security.controller;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.ism.fw.simba.base.ResultVO;
import cn.ism.fw.simba.context.UserPrincipal;
import cn.ism.fw.simba.security.UserVO;
import cn.ism.fw.simba.security.service.ILoginService;
import cn.ism.fw.simba.security.util.LoginUtil;

@RestController
public class LoginController {

  private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

  @Inject
  private ILoginService loginService;

  @PostMapping(value="/login",produces="application/json;charset=utf-8") 
  public ResultVO login(HttpServletRequest request, HttpServletResponse resp, @Validated UserVO userVO, BindingResult bindingResult)
      throws IOException, ServletException { 
    LOG.info("user login::",userVO);
    if (bindingResult.hasErrors()) {
      ResultVO.SUCCESS(bindingResult);
    }

    // TODO:待HEX或者加密密码
    UserVO user = loginService.login(userVO.getUsername(), userVO.getPasswd());
    HttpSession session = request.getSession(true);
    session.setAttribute(LoginUtil.LOCAL_LOGIN_USER, user);
    request.authenticate(resp);

    resp.sendRedirect("web/");
    return null;
  }

  @GetMapping("/logout")
  public void logout(HttpServletRequest request, HttpServletResponse resp) throws IOException { 
    HttpSession session = request.getSession(false);
    if (session != null) {
      UserPrincipal user = LoginUtil.getCurrentUser(request);
      LOG.info("user logout::",user); 
      // TODO:添加登出粗事件
      session.invalidate();
    } 
    resp.sendRedirect("web/page/login.html");
  }

  /**
   * 获取用户环境
   * TODO:待将环境信息写入到界面
   * @return
   * @since 2017年9月26日
   * @author Administrator
   */
  @GetMapping("/environment")
  public Object environment(HttpServletRequest request, HttpServletResponse resp) {
    return null;
  }
  
  /**
   * 会话重建
   * @param request
   * @param resp
   * @since 2017年9月26日
   * @author Administrator
   */
  @GetMapping("/rebuildSession")
  public void rebuildSession(HttpServletRequest request, HttpServletResponse resp) {
    
  }

}

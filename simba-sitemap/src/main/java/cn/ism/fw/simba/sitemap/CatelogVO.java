package cn.ism.fw.simba.sitemap;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Max;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import cn.ism.fw.simba.base.BaseResourceVO;
import cn.ism.fw.simba.jsr.validation.groups.CreateGroup;

/**
 * 栏目VO
 * 
 * @since 2017年5月7日
 * @author Administrator
 */
@Entity
@Table(name="sb_catelog_t")
public class CatelogVO extends BaseResourceVO {

  private static final long serialVersionUID = 4145424803228191015L;

  /**
   * 标题
   */
  @Length(max=500)
  @NotEmpty(groups={CreateGroup.class})
  private String title;

  /**
   * 图标
   */
  @Length(max=50)
  private String icon;

  /**
   * 访问地址
   */
  @Length(max=500) 
  private String url;


  /**
   * url打开方式，inner:内部链接、iframe:嵌入页面，window:打开新窗口
   */
  @Length(max=20)
  private String accessMode;

  /**
   * 父节点ID
   */
  @Length(max=32)
  private String parentId;


  /**
   * 是否生效
   */
  //@Length(max=1)
  private String isEnabled;

  /**
   * 排序
   */ 
  @Max(value=32500)
  private Integer seq;

  /**
   * 显示类型：all:全部可见，child:有子栏目时可用时可见，permission:功能可用时可见
   */
  @Length(max=20)
  private String visibleMode;

  /**
   * 可见的权限点 showMode：功能可用时可见时，会设置内容,对应权限点
   */
  @Length(max=200)
  private String visibleValue;
  
  /**
   * 测试非数据库字段
   */
  @Transient
  private String testField;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getAccessMode() {
    return accessMode;
  }

  public void setAccessMode(String accessMode) {
    this.accessMode = accessMode;
  }

  public String getParentId() {
    return parentId;
  }

  public void setParentId(String parentId) {
    this.parentId = parentId;
  }  
  
  public String getIsEnabled() {
    return isEnabled;
  }

  public void setIsEnabled(String isEnabled) {
    this.isEnabled = isEnabled;
  }

  public Integer getSeq() {
    return seq;
  }

  public void setSeq(Integer seq) {
    this.seq = seq;
  }

  public String getVisibleMode() {
    return visibleMode;
  }

  public void setVisibleMode(String visibleMode) {
    this.visibleMode = visibleMode;
  }

  public String getVisibleValue() {
    return visibleValue;
  }

  public void setVisibleValue(String visibleValue) {
    this.visibleValue = visibleValue;
  } 
 
}

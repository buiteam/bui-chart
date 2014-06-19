/**
 * @fileOverview 图表控件
 * @ignore
 */

var BUI = require('./bui'),
  $ = require("jquery"),
  PlotBack = require('./plotback'),
  Graphic = require('arale-graphic'),
  SeriesGroup = require('./seriesgroup'),
  Theme = require('./theme');

function mixIf(obj1,obj2){
  var rst = {},
    isMerge = false;
  BUI.each(obj1,function(v,k){
    rst[k] = obj2[k];
    if(BUI.isObject(rst[k])){
      BUI.mix(true,rst[k],obj1[k]);
    }else{
      rst[k] = obj1[k];
    }
    
  });
  if(!isMerge){
    rst['lineCfg'] = obj2['lineCfg'];
  }
  return rst;

}

/**
 * @class BUI.Chart.Chart
 * 图，里面包括坐标轴、图例等图形
 * @extends BUI.Component.Controller
 * @mixins BUI.Component.UIBase.Bindable
 */
var Chart = function(cfg){
  this.cfg = cfg;
  this._attrs = {
    autoRender : true,
    visible : true
  };
  var defaultCfg = this.getDefaultCfg();
  BUI.mix(this._attrs,defaultCfg,cfg);
  if(this.get('autoRender')){
    this.render();
  }
};

Chart.ATTRS = {
  /**
   * 画板
   * <code>
   *  var canvas =  chart.get('canvas');
   * </code>
   * @type {BUI.Graphic.Canvas}
   */
  canvas : {

  },
  /**
   * 数据图例默认的颜色顺序
   * @type {Array}
   */
  colors : {

  },
  /**
   * 显示的数据
   * @type {Array}
   */
  data : {

  },
  /**
   * 标示每个图例颜色的配置项
   * @type {Object}
   */
  legend : {

  },
  /**
   * 菜单的配置项
   * @type {Object}
   */
  menu : {

  },
  /**
   * 绘图的配置，包括背景、边框等配置信息
   * @type {Object}
   */
  plotCfg : {

  },
  /**
   * @protected
   * 绘制图形的区域
   * @type {Object}
   */
  plotRange : {

  },
  /**
   * 数据图序列集合
   * @type {Array}
   */
  series : {

  },
  /**
   * 数据图序列默认的配置项
   * @type {Object}
   */
  seriesOptions : {

  },
  /**
   * 子标题
   * @type {String}
   */
  subTitle : {

  },
  /**
   * 标题
   * @type {String}
   */
  title : {

  },
  /**
   * 提示信息
   * @type {Object}
   */
  tooltip : {

  },
  /**
   * x 轴坐标
   * @type {Object|Array}
   */
  xAxis : {

  },

  /**
   * Y 轴坐标
   * @type {Object|Array}
   */
  yAxis : {

  },
  /**
   * 数据中使用的字段，用于转换数据使用例如： 
   *  - fields : ['intelli','force','political','commander']
   *  - 数据：
   * <pre><code>
   * [
   *  {"name" : "张三","intelli":52,"force":90,"political":35,"commander" : 85},
   *   {"name" : "李四","intelli":95,"force":79,"political":88,"commander": 72},
   *  {"name" : "王五","intelli":80,"force":42,"political":92,"commander": 50}
   * ]
   * </code></pre>
   *  - 转换成
   *  <pre><code>
   * [
   *   [52,90,35,85],
   *   [95,79,88,72],
   *   [80,42,92,50]
   * ]
   * </code></pre>
   * @type {Array}
   */
  fields : {
    
  },
  /**
   * 应用的样式
   * @type {Object}
   */
  theme : {
    value : Theme.Base
  }
  /**
   * @event seriesactived
   * 数据序列激活
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesunactived
   * 数据序列取消激活
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesitemactived
   * 数据序列的子项激活，一般用于饼图和柱状图
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.seriesItem 数据序列子项
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesitemunactived
   * 数据序列的子项取消激活，一般用于饼图和柱状图
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.seriesItem 数据序列子项
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesitemclick
   * 数据序列的子项的点击，一般用于饼图和柱状图
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.seriesItem 数据序列子项
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesitemselected
   * 数据序列的子项选中，一般用于饼图和柱状图
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.seriesItem 数据序列子项
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
  /**
   * @event seriesitemunselected
   * 数据序列的子项取消选中，一般用于饼图和柱状图
   * @param {Object} ev 事件对象
   * @param {BUI.Chart.Series} ev.seriesItem 数据序列子项
   * @param {BUI.Chart.Series} ev.series 数据序列对象
   */
  
}


BUI.augment(Chart,{
  getAttrVals: function(){
    return this.__attrVals; //ensureNonEmpty(this, '__attrVals', true);
  },
  /**
   * 获取默认的配置信息
   * @return {Object} 默认的属性
   */
  getDefaultCfg : function(){
    return {};
  },
  /**
   * 设置属性信息
   * @protected
   */
  set : function(name,value){
    this._attrs[name] = value;
  },
  /**
   * 获取属性信息
   * @protected
   */
  get : function(name){
    return this._attrs[name];
  },
  /**
   * 获取初始配置的信息
   * @param  {String} name 配置项名称
   * @return {*}  初始值
   */
  getCfgAttr : function(name){
    return this.cfg[name];

  },
  /**
   * 显示
   */
  show : function(){
    this.get('el').show();
    this.set('visible',true);
  },
  /**
   * 隐藏
   */
  hide : function(){
    this.get('el').hide();
    this.set('visible',false);
  },  
  /**
   * 设置或者设置属性，有一下3中情形：
   *
   *   - name为字符串，value 为空，获取属性值
   *   - name为字符串，value不为空，设置属性值，返回this
   *   - name为键值对，value 为空，设置属性值
   *   
   * @param  {String|Object} name  属性名
   * @param  {*} value 属性值
   * @return {*} 属性值
   */
  attr : function(name,value){
    var _self = this,
    el = _self.get('el');
    if(BUI.isObject(name)){
      BUI.each(name,function(v,k){
        _self.attr(k,v);
      });
      return _self;
    }
    if(value !== undefined){
      return _self._setAttr(name,value);
    }
    return _self._getAttr(name);
  },
  /**
   * 附加事件
   * @param  {String}   eventType 事件类型
   * @param  {Function} fn  事件处理函数
   */
  on : function(eventType,fn){
    var _self = this,
    node = _self.get('node');
    $(node).on(eventType,fn);
    return this;
  },
  /**
   * 移除事件
   * @param  {String}   eventType 事件类型
   * @param  {Function} fn  事件处理函数
   */
  off : function(eventType,fn){
    var _self = this,
    node = _self.get('node');
    $(node).off(eventType,fn);
    return this;
  },
  /**
   * 触发事件
   * @param  {String} eventType 事件类型
   */
  fire : function(eventType){
    var _self = this,
    node = _self.get('node');
    $(node).trigger(eventType);
  },
  /**
   * 添加委托事件,ie7下无效
   * @param  {String}   selector  选择器
   * @param  {String}   eventType 事件类型
   * @param  {Function} fn  事件处理函数
   * @ignore
  delegate : function(selector,eventType,fn){
    var _self = this,
    node = _self.get('node');
    $(node).delegate(selector,eventType,fn);
    return this;
  },*/
  //获取属性值
  _getAttr : function(name){
    var _self = this,
      el = _self.get('el'),
      value = el.attr ? el.attr(name) : '',
      m = '__get' + BUI.ucfirst(name);
    if(_self[m]){
      value = _self[m](value);
    }
    return value;
  },
  //设置属性值
  _setAttr : function(name,value){
    var _self = this,
      el = _self.get('el'),
      m = '__set' + BUI.ucfirst(name);
    if(_self[m]){
      _self[m](value);
    }else{
      el.attr && el.attr(name,value);
    }
    return _self;
  },
  /**
   * @protected
   * 渲染控件
   */
  beforeRenderUI : function(){

  },
  /**
   * 渲染控件/图形
   */
  render : function(){
    var _self = this,
    render = _self.get('render');

    if(!_self.get('rendered')){
      _self.beforeRenderUI();

      var el = $('<div class="ChargWrap"></div>');
      $(render).append(el);
      _self.set('el', el);


      _self.renderUI();
      _self.set('rendered',true);

      
      _self.bindUI();
    }
  },

  renderUI : function(){
    var _self = this;

    _self.paint();
  },
  /**
   * 清除图形
   */
  clear : function(){
    var _self = this,
      canvas = _self.get('canvas');
    canvas.destroy();
    _self.set('isPaint',false);
  },
  /**
   * 绘制整个图
   */
  paint : function(){
    var _self = this;
    if(!_self.get('isPaint')){
      _self._renderCanvas();
      _self._renderPlot();
      _self._renderTitle();
      _self._renderSeries();
      _self.get('canvas').sort();
    }
  },
  //渲染画板
  _renderCanvas : function(){
    var _self = this,
      el = _self.get('el'),
      width = _self.get('width') || el.width(),
      height = _self.get('height') || el.height(),
      canvas = new Graphic.Canvas({
        render : el,
        width : width,
        height :height
      });
    canvas.chart = _self;
    _self.set('canvas',canvas);
  },
  //渲染背景、边框等
  _renderPlot : function(){
    var _self = this,
      plotCfg = _self.get('plotCfg'),
      canvas = _self.get('canvas'),
      theme = _self.get('theme'),
      plotBack,
      plotRange;

    plotCfg = BUI.mix({},theme.plotCfg,plotCfg);
    plotBack = canvas.addGroup(PlotBack,plotCfg),
    plotRange = plotBack.get('plotRange');

    _self.set('plotRange',plotRange);

  },
  //渲染title
  _renderTitle : function(){
    var _self = this,
      title = _self.get('title'),
      subTitle = _self.get('subTitle'),
      theme = _self.get('theme'),
      canvas = _self.get('canvas');
    if(title){
      if(title.x == null){
        title.x = canvas.get('width')/2;
        title.y = title.y || 15;
      }
      title = BUI.mix({},theme.title,title);
      canvas.addShape('label',title);
    }
    if(subTitle){
      if(subTitle.x == null){
        subTitle.x = canvas.get('width')/2;
        subTitle.y = subTitle.y || 35;
      }
      subTitle = BUI.mix({},theme.subTitle,subTitle);
      canvas.addShape('label',subTitle);
    }
  },
  _getDefaultType : function(){
    var _self = this,
      seriesOptions = _self.get('seriesOptions'),
      rst = 'line'; //默认类型是线
    BUI.each(seriesOptions,function(v,k){
      rst = k.replace('Cfg','');
      return false;
    });
    return rst;
  },
  //渲染数据图序列
  _renderSeries : function(){
    var _self = this,
      theme = _self.get('theme'),
      cfg = {},
      attrs = _self.getAttrVals(),
      defaultType = _self._getDefaultType(),
      seriesGroup;

console.log(attrs);
    BUI.each(attrs.series,function(item){
      if(!item.type){
        item.type = defaultType;
      }
    });
    BUI.mix(true,cfg,theme,{
      colors :  attrs.colors,
      data : attrs.data,
      fields : attrs.fields,
      plotRange : attrs.plotRange,
      series : attrs.series,
      seriesOptions : attrs.seriesOptions,
      tooltip : attrs.tooltip,
      legend : attrs.legend,
      xAxis : attrs.xAxis
    });

    if(BUI.isObject(attrs.yAxis)){
      BUI.mix(true,cfg,{
        yAxis : attrs.yAxis
      });
    }else if(BUI.isArray(attrs.yAxis)){
      attrs.yAxis[0] = BUI.merge(true,theme.yAxis,attrs.yAxis[0]);
      cfg.yAxis = attrs.yAxis;
    }


    seriesGroup = _self.get('canvas').addGroup(SeriesGroup,cfg);
    _self.set('seriesGroup',seriesGroup);

  },
  /**
   * 重绘整个图
   */
  repaint : function(){
    var _self = this;
    _self.get('seriesGroup').repaint();
  },
  /**
   * 获取所有的数据序列
   * @return {Array} 所有的数据序列数组
   */
  getSeries : function(){
    return this.get('seriesGroup').getSeries();
  },
   /**
   * 改变数据
   * @param  {Array} data 数据
   */
  changeData : function(data){
    var _self = this,
      group = _self.get('seriesGroup');
    if(data !== _self.get('data')){
      _self.set('data',data);
    }
    group.changeData(data);
  },
  //加载完成数据
  onLoad : function(){
    var _self = this,
      store = _self.get('store'),
      data = store.getResult();
    _self.changeData(data);
  },
  //添加数据
  onAdd : function(e){
    this.onLoad();
  },
  //移除数据
  onRemove : function(e){
    this.onLoad();
  },
  onUpdate : function(e){
    this.onLoad();
  },
  onLocalSort : function(e){
    this.onLoad();
  },
  destructor : function(){
    var _self = this;

    _self.clear();
  }
});

module.exports = Chart;

/**
 * @fileOverview Chart 模块的入口
 * @ignore
 */

  
var BUI = require('./bui'),
  Chart = BUI.namespace('Chart');

BUI.mix(Chart,{
  Chart : require('./chart'),
  Axis : require('./axis'),
  Series : require('./series'),
  PlotRange : require('./plotrange'),
  Theme : require('./theme')
});

module.exports = Chart;

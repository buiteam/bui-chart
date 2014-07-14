/**
 * @fileOverview Chart 模块的入口
 * @ignore
 */

var BUI = require('bui-common'),
  Chart = BUI.namespace('Chart');

BUI.mix(Chart, {
  Chart : require('./src/chart'),
  Axis : require('./src/axis/index'),
  Series : require('./src/series/index'),
  PlotRange : require('./src/plotrange'),
  Theme : require('./src/theme')
});

module.exports = Chart;

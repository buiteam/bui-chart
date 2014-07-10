/**
 * @fileOverview Chart 模块的入口
 * @ignore
 */

var BUI = require('bui-common'),
  Chart = BUI.namespace('Chart');

BUI.mix(Chart, {
  Chart : require('./src/chart'),
  Axis : require('./src/axis'),
  Series : require('./src/series'),
  PlotRange : require('./src/plotrange'),
  Theme : require('./src/theme')
});

module.exports = Chart;

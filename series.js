/**
 * @fileOverview 数据序列的入口文件
 * @ignore
 */


var Series = require('./seriesjs/base');

Series.Line = require('./seriesjs/line');
Series.Area = require('./seriesjs/area');
Series.Column = require('./seriesjs/column');
Series.Scatter = require('./seriesjs/scatter');
Series.Bubble = require('./seriesjs/bubble');
Series.Pie = require('./seriesjs/pie');

module.exports = Series;

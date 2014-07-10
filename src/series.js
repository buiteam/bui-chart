/**
 * @fileOverview 数据序列的入口文件
 * @ignore
 */


var Series = require('./baseseries');

Series.Line = require('./lineseries');
Series.Area = require('./areaseries');
Series.Column = require('./columnseries');
Series.Scatter = require('./scatterseries');
Series.Bubble = require('./bubbleseries');
Series.Pie = require('./pieseries');

return Series;

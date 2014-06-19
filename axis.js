/**
 * @fileOverview 坐标轴的入口文件
 * @ignore
 */

  
var BUI = require('./bui'),
  Axis = require('./axisjs/base');

Axis.Category = require('./axisjs/category');

Axis.Number = require('./axisjs/number');

Axis.Time = require('./axisjs/time');

Axis.Auto = require('./axisjs/auto');

Axis.Circle = require('./axisjs/circle');

Axis.Radius = require('./axisjs/radius');

module.exports = Axis;

/**
 * @fileOverview 坐标轴的入口文件
 * @ignore
 */


var BUI = require('bui-common'),
	Axis = require('./baseaxis');

Axis.Category = require('./categoryaxis');

Axis.Number = require('./numberaxis');

Axis.Time = require('./timeaxis');

Axis.Auto = require('./axis/auto');

Axis.Circle = require('./circleaxis');

Axis.Radius = require('./radiusaxis');

return Axis;

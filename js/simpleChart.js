/*
-------------------------------------------------
Simple Chart JavaScript Plugin, created by Malika banga
Version 1.0.0
-------------------------------------------------
*/

;
(function(global) {
    'use strict';
    var MbChart = function(selector) {
        return new MbChart.init(selector);
    };
    /* Default barOptions */
    var barChartDefaults = {
        height: 400,
        width: 600,
        left: 100,
        bottom: 50,
        type: 'simple',
        showBarValue: true,
        showRuler: true,
        xAxis: {
            text: 'X-Axis',
            textFontSize: 12,
            plotValue: Array(),
            plotValueFontSize: 12,
        },
        yAxis: {
            text: 'Y-Axis',
            textFontSize: 12,
            plotValueFontSize: 12,
            plotValueDifference: 100,
            plotValue: Array(),
            suffix:'',
            minBarVal: Number(),
            maxBarVal: Number(),
        },
    };
    /* Default pieOptions */
    var pieChartDefaults = {
        height: 280,
        width: 800,
        radius: 70,
        plotValue: [{
            title: 'Default',
            number: 100,
            bgColor: 'green'
        }, ],
        showPercent: true,
        showTooltip: false,
        showLegend: true,
        legendTitle: '',
        legendWidth: 100,

    };
    var barComnVar = {};
    MbChart.init = function(selector) {
        /* CHECK IF THE SELECTOR IS AN ID */
        if (selector === '' || selector === undefined) {
            throw 'Please add a valid selector';
        }
        /* Set selector as a global variable */
        global.selector = selector;
    };
    MbChart.prototype = {
        /* Find method to search a selector within the particular chart */
        find: function(elemName) {
            var theId = global.selector;
            var elem = document.querySelector(theId).querySelectorAll(elemName);
            if (elem.length === 1) {
                return elem[0];
            } else {
                return elem;
            }
        },
         /* Set default values of the options in the value is not defined or throw an error of the typeof value is wrong */
        defaultChartValues: function(options, chartDefaults){
            if (options === undefined) {
                options = chartDefaults;
            } else if (typeof options !== 'object') {
                throw 'Please enter valid data';
            } else {
                /* Set default property if the property is not defined */
                for (var prop in chartDefaults) {
                    if (typeof options[prop] !== 'undefined') {
                        if (typeof options[prop] === typeof chartDefaults[prop]) {
                            options[prop] = options[prop];
                            /* Set default property for 2nd level objects */
                            if (typeof chartDefaults[prop] === 'object') {
                                for (var propInner in chartDefaults[prop]) {
                                    options[prop][propInner] = typeof options[prop][propInner] !== 'undefined' ? options[prop][propInner] : chartDefaults[prop][propInner];
                                }
                            }
                        } else {
                            throw 'The type of data entered is incorrect';
                        }
                    } else {
                        options[prop] = chartDefaults[prop];
                    }
                }
            }
        },
        /* Create outer most(basic) structure of the chart */
        barChartSkeleton: function(barOpt, innerData) {
            var theId = document.querySelector(global.selector),
                topValue = barOpt.height - barOpt.bottom;
            innerData = '' || innerData;
            if(!theId.classList.contains('line-chart')){
                theId.className += ' line-chart mb-chart';
            }
            theId.innerHTML = '<svg height="' + barOpt.height + '" width="' + barOpt.width + '">' +
                                innerData +
                                '<g class="plot-lines">' +
                                    '<line x1="' + barOpt.left + '" y1="' + topValue + '" x2="' + barOpt.width + '" y2="' + topValue + '" class="x-axis-line" />' +
                                    '<line x1="' + barOpt.left + '" y1="0" x2="' + barOpt.left + '" y2="' + topValue + '" class="y-axis-line">' +
                                '</g>' +
                               '</svg>';
        },
        barXaxisStructure: function(barOpt){
            /* Start X-axis grouped plot values*/
            var plotLineWidth = barOpt.width - barOpt.left,
                topValue = (barOpt.height - barOpt.bottom),
                xPlotValDistance = plotLineWidth / barOpt.xAxis.plotValue.length,
                leftXplotValue = 0,
                textLeftXplotValue = xPlotValDistance / 2;
            var xAxisValues = '<g class="x-plot-values">';
            /* Add X-Axis values and line */

            for (var i = 0; i < barOpt.xAxis.plotValue.length; i++) {
                leftXplotValue = (xPlotValDistance * (i + 1)) + barOpt.left;
                xAxisValues += '<g class="each-x-plot" width="' + xPlotValDistance + '">' +
                                    '<text x="' + (leftXplotValue - textLeftXplotValue) + ' " y="' + ((topValue + barOpt.xAxis.plotValueFontSize) + 5) + '" font-size="' + barOpt.xAxis.plotValueFontSize + '">' +
                                    barOpt.xAxis.plotValue[i] +
                                    '</text>';
                if(barOpt.showRuler){
                    xAxisValues +=  '<line x1="' + leftXplotValue + '" y1="0" x2="' +  leftXplotValue + '" '+
                                        'y2="' + topValue + '" class="bg-ruler" ' + '/>'; 
                } else{
                    xAxisValues +=  '<line x1="' + leftXplotValue + '" y1="' + topValue + '" x2="' +  leftXplotValue + '" y2="' + (topValue + 15) + '" class="line-sep"/>';
                }
                xAxisValues +='</g>';
            }
            xAxisValues += '</g>'; /* End X-axis grouped plot values*/
            return xAxisValues;
        },
        /* Calculate the Y-Axis' values to be printed */
         barYaxisDistance:  function(barOpt){
            var barYaxisDiff = barOpt.yAxis.plotValueDifference,
                maxYvalue = 0,
                barMinVal = Math.min.apply(null, barOpt.yAxis.plotValue),
                minYvalue = 0,
                newYaxisValues = [],
                yAxisDiffMentioned = false;
            /* Check If min and max value is set or no*/
            if((barOpt.yAxis.maxBarVal >= barOpt.yAxis.minBarVal)
                && ((barOpt.yAxis.maxBarVal + barOpt.yAxis.minBarVal) > barYaxisDiff)) {
                /* Throw error if:
                minimum y-axis value specified is more than the min value of y-axis array
                maximum y-axis value specified is less than the max value of y-axis array*/
                if(Math.min.apply(null, barOpt.yAxis.plotValue) < barOpt.yAxis.minBarVal
                    || Math.max.apply(null, barOpt.yAxis.plotValue) > barOpt.yAxis.maxBarVal) {
                    throw 'Minimum or Maximum value of Y-Axis is incorrect';
                } else{
                    yAxisDiffMentioned = true;
                    minYvalue = Math.floor(barOpt.yAxis.minBarVal / barYaxisDiff) * barYaxisDiff;
                    maxYvalue = Math.ceil(barOpt.yAxis.maxBarVal / barYaxisDiff) * barYaxisDiff;
                }
            } else{
                minYvalue = Math.floor((Math.min.apply(null, barOpt.yAxis.plotValue) / barYaxisDiff)) * barYaxisDiff;
                maxYvalue = Math.ceil((Math.max.apply(null, barOpt.yAxis.plotValue) / barYaxisDiff)) * barYaxisDiff;
            }
            /* Calculate the values of Y-axis on the basis of bar values provided and the difference */
            while (minYvalue <= maxYvalue) {
                newYaxisValues.push(minYvalue);
                minYvalue = minYvalue + barOpt.yAxis.plotValueDifference;
            }
            return newYaxisValues;
        },
        barYaxisStructure: function(barOpt){
            var yAxisValueLength = this.barYaxisDistance(barOpt).length,
                plotLineHeight = barOpt.height - barOpt.bottom,
                yPlotValDistance = plotLineHeight / (yAxisValueLength - 1),
                topYplotValue = 0,
                yTextValue = 0,
                reverseYaxisVal = yAxisValueLength;

            var yAxisValues = '<g class="y-plot-values">';
            /* Add Y-Axis values and line */
            for (var i = 0; i < yAxisValueLength; i++) {
                topYplotValue = yPlotValDistance * (reverseYaxisVal - 1);
                yTextValue = (topYplotValue + (barOpt.yAxis.plotValueFontSize / 2));
                yAxisValues += '<g class="each-y-plot">' +
                                    '<text x="' + (barOpt.left - 5) + '" y="' + (yTextValue - 2) + '"  font-size="' + barOpt.yAxis.plotValueFontSize + '" >' +
                                       this.barYaxisDistance(barOpt)[i] +
                                    '</text>';
                if(barOpt.showRuler){
                    yAxisValues +=  '<line x1="' + barOpt.left + '" y1="' + topYplotValue + '" x2="' + barOpt.width + '" y2="' + topYplotValue + '"  class="bg-ruler"/>'; 
                } else{
                    yAxisValues +=  '<line x1="' + (barOpt.left - 15) + '" y1="' + topYplotValue + '" x2="' + barOpt.left + '" y2="' + topYplotValue + '"  class="line-sep"/>';
                }
                yAxisValues +=  '</g>';
                reverseYaxisVal--;
            }
            yAxisValues += '</g>'; /* End Y-axis grouped plot values*/

            return yAxisValues;
        },
        barCommonStructure: function(barOpt, theBars) {
            theBars = '' || theBars;
            if(barOpt.xAxis.plotValue === undefined || barOpt.yAxis.plotValue === undefined){
                throw 'Please enter X and Y axes\' values';
            }
            /* Assign prototype to a varibale */
            var self = this;
            self.defaultChartValues(barOpt, barChartDefaults);
            /* Call the outer dom of the chart */
            var plotLines = self.find('.plot-lines'),
                plotLineWidth = barOpt.width - barOpt.left,
                plotLineHeight = barOpt.height - barOpt.bottom,
                xPlotValDistance = plotLineWidth / barOpt.xAxis.plotValue.length;
            var xAxisText = '<text text-anchor="middle" class="x-axis-text both-axes-text" x="' + ((plotLineWidth / 2) + barOpt.left) + '" y="' + barOpt.height + '" font-size="' + barOpt.xAxis.textFontSize + '">' + barOpt.xAxis.text + '</text>',
                yAxisText = '<text text-anchor="middle" class="y-axis-text both-axes-text" y="' + barOpt.xAxis.textFontSize + '" x="' + (-plotLineHeight / 2) + '" transform="rotate(-90)" font-size="' + barOpt.yAxis.textFontSize + '">' + barOpt.yAxis.text + '</text>';
            if (barOpt.yAxis.plotValue.length !== barOpt.xAxis.plotValue.length) {
                throw 'Length of X-Axis\' data is not equal to Y-Axis\' data';
            }
                /* Append Text and values to the html */
            var innerDataHTML = yAxisText +  self.barYaxisStructure(barOpt) + self.barXaxisStructure(barOpt) + xAxisText + theBars;
            /* Calling the function againt to add the inner data/dom */
            self.barChartSkeleton(barOpt, innerDataHTML);

        },
        barSimpleChart: function(barOpt) {
            /* Assign prototype to a varibale */
            var self = this;
            self.defaultChartValues(barOpt, barChartDefaults);
            var eachPercent = 0,
                totalValue = 0,
                barHeight = 0,
                barTopVal = 0,
                barLeftVal = 0,
                barWidth = 0,
                leftXplotValue = 0,
                plotLineHeight = barOpt.height - barOpt.bottom,
                xPlotValDistance = (barOpt.width - barOpt.left) / barOpt.xAxis.plotValue.length,
                textLeftXplotValue = xPlotValDistance / 2,
                origYbarValue = barOpt.yAxis.plotValue,
                yValArr = self.barYaxisDistance(barOpt),
                barYaxisDiff = barOpt.yAxis.plotValueDifferencef;
            var barsStructure = '<g class="bars-list">';
            for (var i = 0; i < barOpt.xAxis.plotValue.length; i++) {
                var yDistance = (yValArr[yValArr.length - 1] - yValArr[0]) / plotLineHeight;

                /*Calculate the nearest value of the original Y axis values from the displayed Y axis values */
                barHeight = ((origYbarValue[i] - yValArr[0]) / yDistance) + 1;
                barTopVal = plotLineHeight - barHeight;
                if(barHeight < 0){
                    barTopVal = plotLineHeight;
                    barHeight = (-barHeight);
                }
                leftXplotValue = (xPlotValDistance * (i + 1)) + barOpt.left;
                barWidth = xPlotValDistance * 0.2;
                barLeftVal = leftXplotValue - textLeftXplotValue;
                barsStructure += '<rect x="' + barLeftVal + '"  y="' + barTopVal + '"  width="' + barWidth + '" height="' + barHeight + '" transform="translate(' + (-barWidth / 2) + ')" />';
                if(barOpt.showBarValue){
                    barsStructure += '<text transform="rotate(-90) translate(-' + (barTopVal + 5) + ' ' + (barLeftVal + barWidth * 0.3) + ')" font-size="' + Math.floor(barWidth - 2) + '">' + origYbarValue[i] + barOpt.yAxis.suffix + '</text>';
                }
            }
            barsStructure += '</g>';

            /* Calling the common structure to append the bars in the chart */
            self.barCommonStructure(barOpt, barsStructure);

        },
        /* Create outer most(basic) structure of the chart */
        barChart: function(barOpt) {
            /* Assign prototype to a varibale */
            var self = this.__proto__;
            if (barOpt.type === undefined || barOpt.type === '' || barOpt.type === 'simple') {
                self.barSimpleChart(barOpt);
            } else {
                throw 'Enter correct "type" value of bar chart';
            }
        },
        /* Create outer most(basic) structure of the Pie Chart */
        pieChartSkeleton: function(pieOpt, innerData, legendData) {
            innerData = '' || innerData;
            legendData = '' || legendData;
            var theId = document.querySelector(global.selector);
            if (pieOpt.height < (pieOpt.radius * 4)) {
                throw 'Height of the chart should be 4 times(or more) than the radius of the pie';
            }
            if (pieOpt.width < (pieOpt.radius * 4)) {
                throw 'Width of the chart should be 4 times(or more) than the radius of the pie';
            }
            theId.innerHTML = '<svg height="' + pieOpt.height + '" width="' + pieOpt.width + '">' +
                                '<g class="plot-pie">' +
                                    innerData +
                                '</g>' +
                               '</svg>'+
                               legendData;
        },
        pieChart: function(pieOpt) {
            /* Set default values of the options in the value is not defined or throw an error of the typeof value is wrong */
            /* assign prototype to a varibale */
            this.defaultChartValues(pieOpt, pieChartDefaults);
            var self = this.__proto__;
            /* Call the outer dom of the chart */
            var theId = document.querySelector(global.selector);
            theId.className += ' pie-chart mb-chart';
            if (pieOpt.showLegend) {
                theId.style.width = (pieOpt.width + pieOpt.legendWidth + 50) + 'px';
            } else {
                theId.style.width = pieOpt.width + 'px';
            }
            var valuesArr = pieOpt.plotValue,
                valuesLength = valuesArr.length,
                totalValue = 0,
                eachPercent = 0,
                circumferncePercent = 0,
                pieOffest = 0,
                circleSVG = '';
            var pieRadius = pieOpt.radius,
                pieXval = pieOpt.width / 2,
                pieYval = pieOpt.height / 2,
                circumference = Math.ceil(2 * (Math.PI) * pieOpt.radius);

            /* Calculate the total value of all the numbers in the pie */
            for (var i = 0; i < valuesLength; i++) {
                totalValue += valuesArr[i].number;
            }
            /* Calculate the total value of all the numbers in the pie */
            for (var i = 0; i < valuesLength; i++) {
                eachPercent = Math.round((valuesArr[i].number * 100) / totalValue);
                circumferncePercent = (valuesArr[i].number / totalValue) * circumference;
                if (i !== 0) {
                    pieOffest -= (valuesArr[i - 1].number / totalValue) * circumference;
                }
                circleSVG += '<circle r="' + pieRadius + '"' +
                                'cx="' + pieXval + '"' +
                                'cy="' + pieYval + '"' +
                                'class="sector sector-' + i + '" '+ 
                                'stroke-width="' + ((pieOpt.radius * 2) - 1) + '"' +
                                'stroke-dasharray="' + circumferncePercent + ', ' + circumference + '"' +
                                'stroke-dashoffset="' + pieOffest + '"' +
                                'stroke="' + valuesArr[i].bgColor + '">' +
                             '</circle>';
                if (pieOpt.showPercent) {
                    circleSVG += '<text class="pie-percent-value"  x="150" y="150">' + eachPercent + '%</text>';
                }

            }
            /* Insert the pies in the svg group*/
            self.pieChartSkeleton(pieOpt, circleSVG);
            /* legend */
            if (pieOpt.showLegend) {
                var circleLegend = '';
                circleLegend += '<div class="pie-legend legend" style="max-width:' + pieOpt.legendWidth + 'px">'+
                                    '<div class="middle-legend">' +
                                        '<div class="inner-legend">' +
                                            '<div class="legend-list">';
                if(pieOpt.legendTitle !== ''){
                    circleLegend += '<h4>' + pieOpt.legendTitle + '</h4>';
                }
                for (var i = 0; i < valuesLength; i++) {
                    eachPercent = Math.round((valuesArr[i].number * 100) / totalValue);
                    circleLegend += '<div class="each-legend">' +
                                        '<span style="background-color:' + valuesArr[i].bgColor + '" class="legend-color"></span>' +
                                        '<span>' + valuesArr[i].title + ' (' + eachPercent + '%)</span>' +
                                    '</div>';
                }
                circleLegend +=             '</div>' +
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                /* Insert legend*/
                self.pieChartSkeleton(pieOpt, circleSVG, circleLegend);
            }
        },
    };
    MbChart.init.prototype = MbChart.prototype;
    global.MbChart = global.m = MbChart;
}(window));
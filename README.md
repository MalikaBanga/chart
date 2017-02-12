# Simple JavaScript Chart
Create simple bar and pie chart.

### Installing
Download or Clone the files, add it in your project.
Enqueue your files.

Add this in the `<head>` tag:

```
<link rel="stylesheet" href="<path_to_folder>/css/simpleChart.min.css" />
```

Before closing `<body>` tag add:
```
<script src="<path_to_folder>/js/simpleChart.min.js"></script>
```

### Invoke the Chart
Create an element, add an `id` attribute to it.
```
<div id="my-chart"></div>
```

For Bar Chart, before closing `<body>` tag add:
```
<script>
	m('#my-chart').barChart();
</script>
```
For Pie Chart, before closing `<body>` tag add:
```
<script>
	m('#my-chart').pieChart();
</script>
```
### Options

#### Bar Chart
Note: Do not add any unit for number properties, it will by default consider it as pixles.

Options | Type | Default | Description
------ | ---- | ------- | -----------
height | number | 400 | Height of the chart.
width | number | 600 | Width of the chart.
left | number | 100 | Distance of Y-axis from the chart's left position.
bottom | number | 50 | Distance of X-axis from the chart's bottom position.
showBarValue | boolean | true | Display the values on the bar
showRuler | boolean | true | Display background ruler
xAxis | object | | Consist multiple properties mentioned below
text | string | 'X-Axis' | X-Axis' text
textFontSize | number | 12 | Font size of X-Axis' text
plotValue | array | empty | X-Axis' values
plotValueFontSize | number | 12 | Font size of X-Axis's text
yAxis | object | | Consist multiple properties mentioned below
text | string | 'Y-Axis' | Y-Axis' text
textFontSize | number | 12 | Font size of Y-Axis' text
plotValue | array | empty | Y-Axis' values
plotValueFontSize | number | 12 | Font size of Y-Axis's text
plotValueDifference | number | 100 | difference between each value
minBarVal | number | empty | Minimum value to plot on Y-Axis. This will round off to it's nearest `plotValueDifference` value less than `minBarVal`, that is, if the `minBarVal` mentioned is `120` and the `plotValueDifference` is `50` it will round of to `minBarVal`'s nearest 50 which is 100.
maxBarVal | number | empty | Maximum value to plot on Y-Axis. This will round off to it's nearest `plotValueDifference` value greater than `maxBarVal`, that is, if the `maxBarVal` mentioned is `540` and the `plotValueDifference` is `50` it will round of to `maxBarVal`'s nearest 50 which is 500.


#### Bar chart Example
https://raw.githubusercontent.com/MalikaBanga/chart/screenshots/chart.jpg
```
m('#line-chart').barChart({
	height: 400,
	width:600,
	left:50,
	bottom:50,
	maxBarVal:140,
	minBarVal:0,
	xAxis: {
		text: 'Year',
		plotValue: [1951,1961,1971,1981,1991,2001,2011],
	},
	yAxis: {
		text: 'Population in Crore',
    	plotValueDifference: 20,
		plotValue: [36.11,43.93,54.82,68.33,84.64,102.87,121.07],
	},
});
```


#### Pie Chart
Note: Do not add any unit for number properties, it will by default consider it as pixles.

Options | Type | Default | Description
------ | ---- | ------- | -----------
height | number | 280 | Height of the chart.
width | number | 800 | Width of the chart.
radius | number | 70 | Radius of the sectors(pie).
plotValue | array | [{}] | Consists of objects in an array. Following are the properties of the object:
title | string | 'Default' | Title of a single sector in the pie.
number | number | 100 | Value of a single sector in the pie.
bgColor | string | 'green' | Background color of a single sector in the pie.
showLegend | boolean | true | Display legend of the chart
legendTitle | string | '' | Title of the legend
legendWidth | number | 100 | Width of the legend


#### Pie chart Example
https://raw.githubusercontent.com/MalikaBanga/chart/screenshots/pie.jpg
```
m('#pie-chart').pieChart({
	height: 300,
	width: 400,
	radius:60,
	legendWidth: 160,
	legendTitle: 'Popular Social Media',
	plotValue:[
		{
			title: 'Facebook',
			number: 1790000000,
			bgColor: '#4e71a8',
		},
		{
			title: 'YouTube',
			number: 1000000000,
			bgColor: '#ca3737',
		},
		{
			title: 'Instagram',
			number: 500000000,
			bgColor: '#e03666',
		},
		{
			title: 'Twitter',
			number: 313000000,
			bgColor: '#1cb7eb',
		},
		{
			title: 'Reddit',
			number: 234000000,
			bgColor: '#ff4500',
		},
		{
			title: 'Vine',
			number: 200000000,
			bgColor: '#00bf8f',
		},
	]
});
```
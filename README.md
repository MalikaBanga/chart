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

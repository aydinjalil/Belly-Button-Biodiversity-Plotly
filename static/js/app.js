
function init(){
	var selector = d3.select("#selDataset");

	d3.json("../../samples.json").then((sampleNames) => {
		sampleNames.names.forEach((sample) => {
			selector.append("option")
			.text(sample)
			.property("value", sample);
		});
		chart(sampleNames.names[0]);
		meta_data(sampleNames.names[0]);
		// console.log(sampleNames.names);
	});
}


function meta_data(id){
	d3.json("../../samples.json").then((sampleNames)=>{
		sampleNames.metadata.forEach((meta)=>{
			if (meta.id === parseInt(id)) {
				var div_metadata = d3.select("#sample-metadata");
				div_metadata.html("");

				Object.entries(meta).forEach(([key, value])=>{
					var row = div_metadata.append("p");
					row.text(key + ": " + value);
				});

				// BONUS TASK - Gauge chart
			var level = meta.wfreq;
			var degrees = 180 - (level*20), 
				radius = 0.7;
			var radians = degrees * Math.PI / 180;
			var x = radius*Math.cos(radians);
			var y = radius*Math.sin(radians);

			var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
		         pathX = String(x),
		         space = ' ',
		         pathY = String(y),
		         pathEnd = ' Z';
		    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
		    var data = [{ type: 'scatter',
		       x: [0], y:[0],
		        marker: {size: 28, color:'850000'},
		        showlegend: false,
		        name: 'speed',
		        text: level,
		        hoverinfo: 'text+name'},
		      { values: [45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 50],
		      rotation: 90,
		      text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
		                '1-2', '0-1', ''],
		      textinfo: 'text',
		      textposition:'inside',
		      marker: {colors:['#84B589','rgba(14, 127, 0, .5)', '#64e764',
		                             '#7aea7a', '#90ee90',
		                             '#a6f1a6', '#bcf4bc',
		                             '#d2f8d2','#e8fbe8', 'rgba(255, 255, 255, 0)',]},
		      labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
		      '1-2', '0-1', ''],
		      hoverinfo: 'label',
		      hole: .5,
		      type: 'pie',
		      showlegend: false
		    }];

		    var layout = {
			    	shapes:[{
			    	type: 'path',
			    	path: path,
			    	fillcolor: '850000',
			        line: {
			            color: '850000'
			          }
		        }],

		      	title: 'Belly Button Wash Frequency',
		      	xaxis: {zeroline:false, showticklabels:false,
		                 showgrid: false, range: [-1, 1]},
		      	yaxis: {zeroline:false, showticklabels:false,
		                 showgrid: false, range: [-1, 1]}
		    };
		    Plotly.newPlot('gauge', data, layout);
			};

			
			
			console.log(meta.wfreq);
		});
	});
	
}


function chart(id){
	d3.json("../../samples.json").then((sampleNames) => {

		sampleNames.samples.forEach((sample)=>{

			// Bar Chart Plotly code

					var x_data = [];
					var y_data = [];
					var labels = [];
					var bubble_x = [];
					switch(sample.id){
						case id: 
							sample.otu_ids.forEach((otu_id)=>{
								x_data.push("OTU " + otu_id);
							});
							sample.sample_values.forEach((sample_values)=>{
								y_data.push(sample_values);
							});
							sample.otu_labels.forEach((otu_label)=>{
								labels.push(otu_label);
							});
							sample.otu_ids.forEach((otu_id)=>{
								bubble_x.push(otu_id);
							});

							// Separate data for bar_chart
							var bar_data = [{
							type: "bar",
					    	x: y_data.slice(0,10).reverse(),
					    	y: x_data.slice(0,10).reverse(),
					    	mode: "markers",
					    	text: labels.slice(0,10),
					    	marker: {
					    		// color: (otu.otu_ids),
					    		size: (y_data.slice(0,10)),
					    		width: 1
					    	},
					   	 	orientation: "h",
  						}];

  						// Separate data for bubble chart
  						var bubble_data = [{
  							type: "scatter",
  							y: y_data,
					    	x: bubble_x,
					    	mode: "markers",
					    	text: labels,
					    	marker: {
					    		color: (bubble_x),
					    		size: (y_data),
					    		// sizemode: 'area'
					    	},
  						}];

  						var bubble_layout = {
								  title: 'Bubble Chart',
								  showlegend: false,
								  height: 600,
								  width: 600
								};


  				// Plot bar_chart
  				Plotly.newPlot("bar", bar_data);
  				Plotly.newPlot("bubble", bubble_data);
						break;
					}	
			
		});
	});
	
}
function optionChanged(new_id) {

	chart(new_id);
	meta_data(new_id);
};
init();


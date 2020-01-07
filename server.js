var express = require('express');
var app = express();
var drawShape = require('./src/draw.js').drawShape;

app.set('view engine', 'ejs');
app.use(express.json());

const validation = (obj) => {
	const minValueRules = {
		width: 20,
		height: 20,
		padding:  4
	} 
    let msg = '';
    for (var key in obj) {
    	let val = obj[key];
    	let minVal = parseInt(minValueRules[key]);
     	if (val < minVal) {
     		msg = msg + " - " + key + " should be >= " + minVal + ".\n";
     	} else if (isNaN(val)) {
     		msg = msg + " - " + key + " should be a number.\n";
     	}
     	if (val % 2 !== 0) {
     		msg = msg + " - " + key + " should be even number.\n";
     	}
     } 
     return msg;
}

// index page 
app.get('/', function(req, res) {
	const {"query":{width: width = '', height: height = '', padding:padding = ''}} = req;
	let shape = null;
	let msg = validation(req.query)
	if (msg === '' && width && height && padding) {
		shape = drawShape(width, height, padding)
	} else {
		shape = msg;
	}
    res.render('index', {
    	shape: shape,
    	width: width || 120,
    	height: height || 60, 
    	padding: padding || 4
	});
});

const server = app.listen(process.env.PORT || 8182, function () {
   const host = server.address().address || "localhost";
   const port = server.address().port;
   console.log(`Server listening at http://${host}:${port}`);
})
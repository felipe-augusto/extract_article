'use strict';

var express = require('express');
var read = require('node-readability');

// Constants
var PORT = 3000;

// App
var app = express();

app.get('/', function (req, res) {
	if (global.gc) {
	    global.gc();
	}
	if(req.query.url) {
		read(req.query.url, function(err, article, meta) {
			if(err) {
				res.json({"error": err});
			} else {
				res.json({"html" : article.content, "title": article.title});
			}
			article.close();
		})
	} else {
		res.json({"error" : "Nenhuma url foi recebida"});
	}
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
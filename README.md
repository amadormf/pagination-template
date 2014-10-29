pagination-template
===================

Pagination of results for use in a templates in node.js. With 2 simple lines of code generate a pagination object to use in a template.

##Install

	npm install pagination-template

##Use

	var pagination = require('pagination-template');
	var paginator = new pagination('search', 3, 141, 13);
	var result = paginator.getPagination();


##Use with Express

	res.render('index', {
		pagination : result
	});


##Template


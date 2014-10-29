pagination-template
===================

Pagination of results for use in a templates in node.js. With 2 simple lines of code generate a pagination object to use in a template.

##Install

	npm install pagination-template

##Use

	var pagination = require('pagination-template');
	var paginator = new pagination('search', 3, 141, 13);
	var result = paginator.getPagination();

The value of variable result in this example is:
	
	[ { url: 'search/1/13',
	    actualPage: false,
	    index: 1 },
	  { url: 'search/2/13',
	    actualPage: false,
	    index: 2 },
	  { url: 'search/3/13',
	    actualPage: true,
	    index: 3 },
	  { url: 'search/4/13',
	    actualPage: false,
	    index: 4 },
	  { url: 'search/5/13',
	    actualPage: false,
	    index: 5 },
	  { url: 'search/6/13',
	    actualPage: false,
	    index: 6 },
	  { url: 'search/7/13',
	    actualPage: false,
	    index: 7 },
	  { url: 'search/8/13',
	    actualPage: false,
	    index: 8 },
	  { url: 'search/9/13',
	    actualPage: false,
	    index: 9 },
	  { url: 'search/10/13',
	    actualPage: false,
	    index: 10 },
	  { url: 'search/11/13',
	    actualPage: false,
	    index: 11 } ]
	

##Use with Express

	res.render('index', {
		pagination : result
	});


##Template


##Options

You can send options to constructor for more customization, the posible opstions are:

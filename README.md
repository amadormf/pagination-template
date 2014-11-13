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


##Parameters

You can send optional parameters to the constructor for more customization

Example:
	
	var parameters = {
		maxPagination : 10,  				
		showBeginingEnd: true,				
		domain: 'http://www.google.com', 	
	};
	var paginator = new pagination('search', 3, 141, 13, parameters);

###maxPagination
Maximum number of indexes show. If for example we have a 20 pages and the maxPagination  value is 10 the result is and the actual pages is 7 the result is 4 5 6 7 8 9 10 11 12 13

###showBeginingEnd
Check if they have to show the scroll buttons start end

###domain
If this options is passed then the url will be the concatenation of domain and the urlOrigin

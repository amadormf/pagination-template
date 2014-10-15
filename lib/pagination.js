/**
  Module for create a pagination for use in a templates
**/

/**
 Function pagination, create a object

 @param urlOrigin Set the url begin 
 @param pageAct Actual page visit for the user
 @param totalResults Number of rows
 @param rowsPerPage Rows per page that we will show
 @param options Object whith another options 
 	options: {
		maxPagination : 10,  				//Maximum number of indeces show
										 	//If for example we have a 20 pages and 
										 	//the maxPagination  value is 10 the result is
										 	//and the actual pages is 7 the result is
										 	//4 5 6 7 8 9 10 11 12 13	
		showBeginingEnd: true,				//Check if they have to show the scroll buttons start end	
		domain: 'http://www.google.com', 	//If this options is passed then the url will 
										 	//be the concatenation of urlOrigin and the domain
 	}
**/
exports.pagination = function(urlOrigin, pageAct, totalResults, rowsPerPage, options){		
	if(options === undefined){		
		options = {};
	}
	else{
		options = options;
	}		
	/**
	 Return an array with the objects for pagination
	 @return An array with objects {
		url: /search/1/10
		actualpage: true	//indicate if is the actual page
		index: 1 			//if the number of page	
	 }
	**/
	this.getPagination = function (){
		var maxPages = totalResults / rowsPerPage;
		var maxPagination = 0;
		var ini = 1;
		var pages = Math.floor((totalResults / rowsPerPage)) + ((totalResults % rowsPerPage)>0 ? 1:0);
		var last = pages;
		var end = pages;

		var paginationResult = [];
		//check option maxPagination
		if(options!==undefined && options.maxPagination>0){
			maxPagination = options.maxPagination;
		}
		//check the begin of pagination
		if(maxPagination>0 &&  pageAct>(maxPagination/2)){
			ini = pageAct - (maxPagination/2);			
		}

		//check the finish of pagination
		if(maxPagination>0 && (maxPagination+ini) <  last){
			end = (ini + maxPagination) -1;
		}		
		console.log(ini, end, maxPagination);
		if(maxPagination > 0 && (last - ini) <maxPagination){		
			ini = (end - maxPagination) + 1;
			//check ini is negative
			if(ini < 1){
				ini = 1;
			}
		}
		console.log(ini, end, maxPagination);
		//check domain option
		var urlFinish = options.domain !== undefined ? (options.domain + urlOrigin) : (urlOrigin);

		//check go first button 		
		if(options!==undefined && options.showBeginingEnd){
			var pagina = {}	
			pagina.url = urlFinish + '/' + 1 + '/' + rowsPerPage;			
			pagina.actualPage = (i===1);
			pagina.index = i;
			pagina.specialButton = "first";
					
			paginationResult.push(pagina);
		}
		//console.log(ini, last, end);
		for(var i = ini; i<= end; ++i){
			var  pagina = {};

			pagina.url = urlFinish + '/' + i + '/' + rowsPerPage;			
			pagina.actualPage = (i===pageAct);
			pagina.index = i;			

			paginationResult.push(pagina);


		};
		//check go last button 
		if(options!==undefined && options.showBeginingEnd){
			var pagina = {};
			pagina.url = urlFinish + '/' + last + '/' + rowsPerPage;			
			pagina.actualPage = (last===pageAct);
			pagina.index = last;			
			pagina.specialButton = "last";
			paginationResult.push(pagina);
		}		
		return paginationResult;
	}



}	

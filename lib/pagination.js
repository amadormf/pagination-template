'use strict';
/**
  Module for create a pagination for use in a templates
**/
module.exports = Pagination;

/**
 Function pagination, create a object

 @param urlOrigin Set the url begin
 @param pageAct Actual page visit for the user
 @param totalResults Number of rows
 @param rowsPerPage Rows per page that we will show
 @param options Object whith another options
 	options: {
		maxPagination : 10,  				//Maximum number of indexes show
										 	//If for example we have a 20 pages and
										 	//the maxPagination  value is 10 the result is
										 	//and the actual pages is 7 the result is
										 	//4 5 6 7 8 9 10 11 12 13
		showBeginingEnd: true,				//Check if they have to show the scroll buttons start end
		domain: 'http://www.google.com', 	//If this options is passed then the url will
										 	//be the concatenation of urlOrigin and the domain
		showPreviousNext: true				//show next last buttons
 	}
**/
function Pagination(urlOrigin, pageAct, totalResults, rowsPerPage, options){
	this.options = options || {};
	this.pageAct = pageAct;
	this.urlOrigin = urlOrigin;
	this.totalResults = totalResults;
	this.rowsPerPage = rowsPerPage;
}
/**
 Return an array with the objects for pagination
 @return An array with objects {
	url: /search/1/10
	actualpage: true	//indicate if is the actual page
	index: 1 			//if the number of page

 }
**/
Pagination.prototype.getPagination = function(){
	var maxPagination = 0;
	var ini = 1;
	var pages = Math.floor((this.totalResults / this.rowsPerPage)) + ((this.totalResults % this.rowsPerPage)>0 ? 1:0);
	var last = pages;
	var end = pages;

	var paginationResult = [];
	//check option maxPagination
	if(this.options!==undefined && this.options.maxPagination>0){
		maxPagination = this.options.maxPagination;
	}
	//check the begin of pagination
	if(maxPagination>0 &&  this.pageAct>(maxPagination/2)){
		ini = this.pageAct - (maxPagination/2);
	}

	//check the finish of pagination
	if(maxPagination>0 && (maxPagination+ini) <=  last){
		end = (ini + maxPagination) - 1;
	}
	if(maxPagination > 0 && (last - ini) <maxPagination){
		ini = (end - maxPagination) + 1;
		//check ini is negative
		if(ini < 1){
			ini = 1;
		}
	}
	//check domain option
	var urlFinish = this.options.domain !== undefined ? (this.options.domain + this.urlOrigin) : (this.urlOrigin);

	//check go first button
	if(this.options!==undefined && this.options.showBeginingEnd){
		var pagina = {}
		pagina.url = generateUrl(urlFinish, 1, this.rowsPerPage);
		pagina.actualPage = (this.pageAct===1);
		pagina.index = 1;
		pagina.specialButton = "first";

		paginationResult.push(pagina);
	}
	if(this.options!==undefined && this.options.showPreviousNext){
		var pagina = {};
		var page = this.pageAct  - (this.pageAct===1 ? 0 : 1);
		pagina.url = generateUrl(urlFinish, page, this.rowsPerPage);
		pagina.actualPage = (this.pageAct===page);
		pagina.index = page;
		pagina.specialButton = "previous";

		paginationResult.push(pagina);
	}
	for(var i = ini; i<= end; ++i){
		var  pagina = {};

		pagina.url = generateUrl(urlFinish, i, this.rowsPerPage);
		pagina.actualPage = (i===this.pageAct);
		pagina.index = i;

		paginationResult.push(pagina);


	};
	if(this.options!==undefined && this.options.showPreviousNext){
		var pagina = {};
		var page = this.pageAct  + (this.pageAct===last ? 0 : 1);
		pagina.url = generateUrl(urlFinish, page, this.rowsPerPage);
		pagina.actualPage = (i===page);
		pagina.index = page;
		pagina.specialButton = "next";

		paginationResult.push(pagina);
	}
	//check go last button
	if(this.options!==undefined && this.options.showBeginingEnd){
		var pagina = {};
		pagina.url = generateUrl(urlFinish, last, this.rowsPerPage);
		pagina.actualPage = (last===this.pageAct);
		pagina.index = last;
		pagina.specialButton = "last";
		paginationResult.push(pagina);
	}
	return paginationResult;
}

function generateUrl(url, index, rowsPerPage){
	return url + '/' + index + '/' + rowsPerPage;
}
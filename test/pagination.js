var pag = require('../index.js');
describe('PAGINATION', function() {		
	it('Check basic pagination', function(done){		
		pag.pagination('search', 1, 100, 10);
		var result = pag.getPagination();
		expect(result).to.be.a('array');
		//check the length of results
		expect(result).to.have.length(10);		
		//check if the actual pages is marked
		expect(result[0]).to.have.property('actualPage').with.equal(true);
		done();
	});
	it('Check void pagination', function(done){
		pag.pagination('search', 1, 0, 10);
		var result = pag.getPagination();		
		expect(result).to.be.a('array');
		//check the length of results
		expect(result).to.have.length(0);			
		done();
	});
	it('Check basic option maxPagination', function(done){
		pag.pagination('search', 1, 150, 10, {maxPagination:10});
		var result = pag.getPagination();		
		//check the length of results
		expect(result).to.have.length(10);		
		done();
	});
	it('Check basic option with actual page = 3 maxPagination', function(done){
		pag.pagination('search', 3, 150, 10, {maxPagination:10});
		var result = pag.getPagination();		
		//check the length of results
		expect(result).to.have.length(10);		
		//check if the actual pages is marked
		expect(result[2]).to.have.property('actualPage').with.equal(true);		
		done();
	});	
	it('Check extended option maxPagination', function(done){
		pag.pagination('search', 8, 150, 10, {maxPagination:10});
		var result = pag.getPagination();		
		//check the length of results		
		expect(result).to.have.length(10);

		//check if the actual pages is marked
		expect(result[5]).to.have.property('actualPage').with.equal(true);
		done();
	});	
	it('Check extended option maxPagination, the finish is near', function(done){
		pag.pagination('search', 14, 150, 10, {maxPagination:10});
		var result = pag.getPagination();		
		//check the length of results
		expect(result).to.have.length(10);
		//check if the actual pages is marked
		expect(result[8]).to.have.property('actualPage').with.equal(true);
		done();
	});	
	it('Check extended option maxPagination, the finish is here', function(done){
		pag.pagination('search', 15, 150, 10, {maxPagination:10});
		var result = pag.getPagination();		
		//check the length of results
		expect(result).to.have.length(10);
		//check if the actual pages is marked
		expect(result[9]).to.have.property('actualPage').with.equal(true);
		done();
	});	
	it('Check decimals for maxPagination results', function(done){
		pag.pagination('search', 3, 141, 13, {maxPagination:13});
		var result = pag.getPagination();		
		for(var i =0; i< result.length; ++i){
			var index = result[i].index;
			var strIndex = index.toString();
			expect(strIndex).not.include('.');			
		}		
		done();

	});	
	it('Check negative number for maxPagination index', function(done){
		pag.pagination('search', 3, 141, 13, {maxPagination:13});
		var result = pag.getPagination();
		console.log(result);		
		if(result[0].index < 0){
			done(new Error('Negative number for index'));			
		}
		else{
			done();
		}					
	});
	it('Check first last button', function(done){
		pag.pagination('search', 15, 150, 10, {showBeginingEnd:true});
		var result = pag.getPagination();			
		//check the length of results
		expect(result).to.have.length(17);
		//check if the actual pages is marked
		expect(result[0]).to.have.property('specialButton').with.equal('first');
		expect(result[16]).to.have.property('specialButton').with.equal('last');
		done();
	});
	it('Check first last button with maxPagination', function(done){
		pag.pagination('search', 15, 150, 10, {maxPagination:10, showBeginingEnd:true});
		var result = pag.getPagination();				
		//check the length of results
		expect(result).to.have.length(12);
		//check if the actual pages is marked
		expect(result[0]).to.have.property('specialButton').with.equal('first');
		expect(result[11]).to.have.property('specialButton').with.equal('last');
		done();
	});
	it('Check domain option', function(done){
		var domain = 'http://www.google.es/';
		pag.pagination('search', 15, 150, 10, {domain: domain});
		var result = pag.getPagination();				
		//check the length of results
		expect(result).to.have.length(15);		
		//check if the actual pages is marked
		expect(result[0]).to.have.property('url').with.include(domain);
		done();
	});




});

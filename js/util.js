define(function() {
	return {
		randomFromInterval : function(from,to)
		{
		    return Math.floor(Math.random()*(to-from+1)+from);
		}
	}
});
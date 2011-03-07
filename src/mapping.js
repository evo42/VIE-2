/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

Mapping = function(id, options) {

	this.id = id;
	this.options = options;
	
	$.VIE2.registerMapping(this);
};

Mapping.prototype.init = function() {};

Mapping.prototype.filter = function (context, matches) {};
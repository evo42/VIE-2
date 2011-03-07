/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

Connector = function(id, options) {

	this.id = id;
	this.options = options;
	
	$.VIE2.registerConnector(this);
};

Connector.prototype.init = function() {};

Connector.prototype.analyze = function (object, callback) {};

Connector.prototype.query = function (uri, context) {};

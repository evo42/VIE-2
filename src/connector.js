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

Connector.prototype.analyze = function (object, callback) {
	$.VIE2.log("info", "VIE^2.Connector(" + this.id + ")", "Not implemented: analyze();");
};

Connector.prototype.query = function (uri, context) {
	$.VIE2.log("info", "VIE^2.Connector(" + this.id + ")", "Not implemented: query();");
};

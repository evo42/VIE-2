/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

var rdfaConnector = new Connector('rdfa');

rdfaConnector.analyze = function (object, namespaces, callback) {
	if (object == undefined) {
		jQuery.VIE2.log ("warn", "VIE2.Connector('" + this.id + "')", "Given object is undefined!");
		return;
	} else if (typeof object === 'object') {
		//does only work on objects that have the 'typeof' attribute set!
		if (object.attr('typeof')) {
			//use rdfQuery to analyze the object
			var rdf = jQuery(object).rdfa();

			callback(rdf);
		} else {
			jQuery.VIE2.log("info", "VIE2.Connector(" + this.id + ")", "Object has no 'typeof' attribute! Trying to find children.");
			var rdf = jQuery.rdf();
			object.find('[typeof]').each(function(i, e) {
				var rdfa = jQuery(e).rdfa();
				rdf.add(rdfa);
			});
			callback(rdf);
		}
	} else {
		jQuery.VIE2.log("error", "VIE2.Connector(" + this.id + ")", "Expected object, found: '" + (typeof object) + "'");
	}
};
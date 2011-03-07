/**
 * VIE^2 is the semantic enrichment layer on top of VIE. 
 * Through it you can query and find related content 
 * for your editables. VIE^2 can talk to services like 
 * Apache Stanbol and OpenCalais to find related 
 * information for your content.
 */

/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

(function($, undefined) {

	/**
	 * You can call .vie2() on every jQuery object.
	 */
    $.widget('VIE2.vie2', {

    	_context: {},

    	_oldMatches: [],
    	_matches: [],
    	
    	/**
		 * options:
		 * async: true, false
		 */
		analyze: function (async) {
			jQuery.VIE2.log("info", "VIE2.core", "Start analyze!");
			var that = this;
			var elem = this.element;
			jQuery.each(jQuery.VIE2.connectors, function () {
				jQuery.VIE2.log("info", "VIE2.core", "Starting analysis with connector: '" + this.id + "'!");
				var callback = function (conn) {
					return function (rdf) {
						that._context[conn.id] = rdf;
						jQuery.VIE2.log("info", "VIE2.core", "Received RDF annotation from connector '" + conn.id + "'!");
					};
				}(this);
				if (async) {
					window.setTimeout(this.analyze(elem, callback), 0); // execute the analysis in an own thread
				} else {
					this.analyze(elem, callback);
				}
			});
			jQuery.VIE2.log("info", "VIE2.core", "Finished task: 'analyze'!");
			
			return this;
		},
		
		filter: function (type) {

			this._oldMatches = this._matches;
			this._matches = [];
			var that = this;
			
			jQuery.each(jQuery.VIE2.mappings, function () {
				if (this.id === type) {
					jQuery.merge(that._matches, this.filter(that._context, that._oldMatches));
					return false;
				}
			});
			return this;
		}, 
		
		undo: function () {
			this._matches = this._oldMatches;
			this._oldMatches = [];
		},
		
		matches: function () {
			return this._matches;
		}
		
	});
}(jQuery));

jQuery.VIE2.log = function (level, component, message) {
	switch (level) {
	case "info":
		console.info(component + ' ' + message);
		break;
	case "warn":
		console.warn(component + ' ' + message);
		break;
	case "error":
		console.error(component + ' ' + message);
		break;
	}
}

jQuery.VIE2.connectors = [];

jQuery.VIE2.registerConnector = function (connector) {
	//first check if there is already 
	//a connector with 'connector.id' registered
	var register = true;
	jQuery.each(jQuery.VIE2.connectors, function () {
		if (this.id === connector.id) {
			register = false;
			return;
		}
	});
	if (register) {
		jQuery.VIE2.connectors.push(connector);
		jQuery.VIE2.log("info", "VIE2.core", "Registered connector '" + connector.id + "'");
	} else {
		jQuery.VIE2.log("warn", "VIE2.core", "Did not register connector, as there is" +
				"already a connector with the same id registered.");
	}
}

jQuery.VIE2.unregisterConnector = function (connector) {
	jQuery.each(jQuery.VIE2.connectors, function () {
		//TODO: untested code!
		if (this.id === connector.id) {
			//TODO: array slice
			jQuery.Aviate.log("info", "VIE2.core", "De-registered connector '" + connector.id + "'");
			return;
		}
	});
}

jQuery.VIE2.mappings = [];

jQuery.VIE2.registerMapping = function (mapping) {
	//first check if there is already 
	//a mapping with 'mapping.id' registered
	var register = true;
	jQuery.each(jQuery.VIE2.mappings, function () {
		if (this.id === mapping.id) {
			register = false;
			return;
		}
	});
	if (register) {
		jQuery.VIE2.mappings.push(mapping);
		jQuery.VIE2.log("info", "VIE2.core", "Registered mapping '" + mapping.id + "'");
	} else {
		jQuery.VIE2.log("warn", "VIE2.core", "Did not register mapping, as there is" +
				"already a mapping with the same id registered.");
	}
}

jQuery.VIE2.unregisterMapping = function (mapping) {
	jQuery.each(jQuery.VIE2.mappings, function () {
		//TODO: untested code!
		if (this.id === mapping.id) {
			//TODO: array slice
			jQuery.Aviate.log("info", "VIE2.core", "De-registered mapping '" + mapping.id + "'");
			return;
		}
	});
}
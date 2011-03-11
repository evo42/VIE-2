/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

var JSONLDEntity = function (namespaces, uri, type, properties) {
	
	var jsonld =  {
		  "#": namespaces,
		  "@": uri,
		   "a": type
	};
	
	for (var key in properties) {
		jsonld[key] = properties[key]; 
	}
	
	return jsonld;
};
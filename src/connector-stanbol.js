/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

var stanbolConnector = new Connector('stanbol', {
	"proxy_url" : "../utils/proxy/proxy.php",
	"enhancer_url" : "http://stanbol.iksfordrupal.net:9000/engines/",
	"entityhub_url" : "http://stanbol.iksfordrupal.net:9000/entityhub/"
});

stanbolConnector.analyze = function (object, callback) {
	if (object == undefined) {
		jQuery.VIE2.log ("warn", "VIE2.Connector('" + this.id + "')", "Given object is undefined!");
		return;
	} else if (typeof object === 'object') {
		//stanbol can not deal with embedded HTML, so we remove that. --> BAD!
		var text = "";
		if (object.get(0).tagName && object.get(0).tagName == 'TEXTAREA') {
			text = object.get(0).val();
		} else {
			text = object
	        .clone()    //clone the element
	        .children() //select all the children
	        .remove()   //remove all the children
	        .end()  //again go back to selected element
	        .text()    //get the text of element
	        .replace(/\s+/g, ' ') //collapse multiple whitespaces
	        .replace(/\0\b\n\r\f\t/g, '').trim(); // remove non-letter symbols
		}
		var rdf = stanbolConnector.enhance(text);
		
		if (object.find('*').length) {
			object.find('*').each(function () {
				var obj = jQuery(this);
				var textc = "";
				if (obj.get(0).tagName && obj.get(0).tagName == 'TEXTAREA') {
					textc = obj.get(0).val();
				}
				else {
				textc = obj
		        .clone()    //clone the element
		        .children() //select all the children
		        .remove()   //remove all the children
		        .end()  //again go back to selected element
		        .text()    //get the text of element
		        .replace(/\s+/g, ' ') //collapse multiple whitespaces
		        .replace(/\0\b\n\r\f\t/g, '').trim(); // remove non-letter symbols
				}
				var rdfc = stanbolConnector.enhance(textc);
				//merging the results into the main object
				rdfc.databank.triples().each(function () {
					rdf.add(this);
				});
			});
		}
		
		callback(rdf);
		
	} else {
		jQuery.VIE2.log("error", "VIE2.Connector(" + this.id + ")", "Expected object, found: '" + (typeof object) + "'");
	}
};

stanbolConnector.enhance = function (text) {
	if (text.length === 0) {
		//empty text
		return jQuery.rdf();
	}
	
	var enhancerOutput = stanbolConnector.queryEnhancer(text);
	if (enhancerOutput.status === 200) {
		var responseObj = jQuery.parseJSON(enhancerOutput.responseText);
		var rdf = stanbolConnector.parseEnhancerOutput(responseObj);
		var rdf2 = rdf;//TODO: stanbolConnector.fillWithEntityHubInfo(rdf);
		return rdf2;
	}
}

stanbolConnector.queryEnhancer = function (text) {

	var proxy = this.options.proxy_url;
	var enhancer_url = this.options.enhancer_url;

	if (proxy) {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: proxy,
			data: {
    			proxy_url: enhancer_url, 
    			content: text,
    			verb: "POST",
    			format: "application/rdf+json"
			}
		});
	} else {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: enhancer_url,
			data: text,
			dataType: "application/rdf+json"
		});
	}
};

stanbolConnector.parseEnhancerOutput = function (data) {
	return jQuery.rdf().load(data, {});
};

stanbolConnector.fillWithEntityHubInfo = function (rdf) {
	jQuery.each(rdf.databank.objectIndex, function (uri) {
		var uriStr = uri.toString().replace(/"/g, '').replace(/</, '').replace(/>/, '');
		if (uriStr.match('^urn:.*')) {
			//ignore these uris!
			return jQuery.rdf();
		}
		var result = stanbolConnector.queryEntityHub(uriStr);
		if (result.status == 200) {
			var resultText = result.responseText;
			var resultObj = jQuery.parseJSON(resultText);
			rdf.load(resultObj);
		};
	});
	return rdf;
};

stanbolConnector.queryEntityHub = function (uri) {
	var proxy = this.options.proxy_url;
	var entityhub_url = this.options.entityhub_url.replace(/\/$/, '');
	if (proxy) {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: proxy,
			data: {
    			proxy_url: entityhub_url + "/sites/entity?id=" + uri, 
    			content: '',
    			verb: "GET",
    			format: "application/rdf+json"
			}
		});
	} else {
		return jQuery.ajax({
			async: false,
			type: "GET",
			url: entityhub_url + "/sites/entity?id=" + uri,
			data: text,
			dataType: "application/rdf+json"
		});
	}
};
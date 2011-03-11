/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

new Mapping('places', {
	mapping :  {
		'type' : {
			'rdfa' : {
				'type' : 'rdf:type', 
				'value' : 'dbonto:PopulatedPlace'
			}
		},
		'name' : {
			'rdfa' : ['rdfs:label', 'foaf:name']
		},
		'url' : {
			'rdfa' : 'foaf:page'
		},
		'depiction' : {
			'rdfa' : 'foaf:depiction'
		},
		'long' : {
			'rdfa' : '<http://www.w3.org/2003/01/geo/wgs84_pos#long>'
		},
		'lat' : {
			'rdfa' : 'geo:lat'
		}
	}
});
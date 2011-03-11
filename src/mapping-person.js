/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

var mappingPerson = new Mapping('person');

mappingPerson.connectorMappers = {};

mappingPerson.filter = function (vie2, context, matches) {
	var persons = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = mappingPerson.connectorMappers[connectorId];
		if (mapper) {
			//TODO: check for duplicates (URI)
			jQuery.merge(persons, mapper(rdf, matches));
		}
	});

	return persons;
};

mappingPerson.connectorMappers['stanbol'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject <http://purl.org/dc/terms/type> <http://dbpedia.org/ontology/Person>')
	.where('?subject <http://fise.iks-project.eu/ontology/selected-text> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence')
    .each (function () {
    	var entity = new RDFEntity();
    	
    	entity.set({
				uri : this.subject,
				name : this.name.toString()
		});
		ret.push(entity);
	});
    
	return ret;	
};

mappingPerson.connectorMappers['rdfa'] = function (rdf, matches) {
    var ret = [];
   	
    rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://xmlns.com/foaf/0.1/Person>')
	.where('?subject <http://xmlns.com/foaf/0.1/name> ?name')
	.each (function () {
		var entity = new RDFEntity();
		
		entity.set({
			uri : this.subject,
			name : this.name.toString()
		});
		ret.push(entity);
	});
    
	return ret;	
};

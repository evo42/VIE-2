/**
 * @fileOverview VIE^2
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 */

var mappingEntity = new Mapping('entity');

mappingEntity.filter = function (vie2, context, matches) {
	var entities = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = mappingEntity.connectorMapper;
		if (mapper) {
			//TODO: check for duplicates (URI)
			jQuery.merge(entities, mapper(rdf, matches, connectorId));
		}
	});

	return entities;
};

mappingEntity.connectorMapper = function (rdf, matches, connectorId) {
    var ret = [];
    
    if (connectorId === 'stanbol') {
	    rdf
	    .where('?subject a ?type')
	    .where('?subject <http://fise.iks-project.eu/ontology/entity-reference> ?entity')
	    .where('?subject <http://fise.iks-project.eu/ontology/entity-type> ?type2')
	    .each (function () {
	    	var entity = this.entity.toString();
	    	var etype = this.type2.toString();
	
	    	var entity = new JSONLDEntity(
	    			rdf.databank.namespaces, 
	    			entity, 
	    			etype
	    		);
	    	
			ret.push(entity);
		});
    }

	return ret;	
};
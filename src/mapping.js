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

Mapping.prototype.filter = function (vie2, context, matches) {
	var entities = [];
	var that = this;
	
	jQuery.each(context, function (connId, rdf) {
		if (that.options.mapping.type[connId]) {
			//TODO: if (typeof that.options.mapping.type[connId] === 'array')
			rdf
			.where('?subject' + ' ' +
					that.options.mapping.type[connId].type + ' ' + 
					that.options.mapping.type[connId].value)
			.each(function () {
				var entity = {};
				var subject = this.subject;
				var triples = rdf.databank.subjectIndex[subject];
				jQuery.each(that.options.mapping, function (key, val) {
					if (key !== 'type') {
						if (key === '*') {
							//TODO: key === '*'
						} else {
							entity[key] = [];
							var property = val[connId];
							if (property) {
								if (typeof property === 'string') {
									property = [property];
								}	
								if (jQuery.isArray(property)) {
									jQuery.each(property, function (i, v) {
										var prop = jQuery.rdf.resource(v, { namespaces: rdf.databank.namespaces });
										jQuery.each(triples, function () {
											if (this.property === prop) {
												entity[key].push(this.object);
											}
										});
										//TODO: gather this to reduce numer of calls
										if (entity[key].length === 0) {
											//get it from another connector!
											var queryResult = vie2.query(subject, [prop]);
											if (queryResult[prop]) {
												jQuery.extend(entity[key], queryResult[prop]);
											}
										}
									});
								}
							}
						}
					}
				});
				entities.push(entity);
			});
		}
	});
	
	return entities;
};
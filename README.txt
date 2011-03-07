= VIE^2 =

== Building ==

Use 'ant clean && ant' in the main directory.

== Usage ==

Please have a look at ./demos/test.html for an examplified usage.

We need basically 4 parts to be imported into a web-application:

(1) 3rd party libs:

<script type="text/javascript" src="../lib/jquery/1.4/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="../lib/jquery-ui/1.8/js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="../lib/rdfquery/latest/jquery.rdfquery.all.min.js"></script>
<script type="text/javascript" src="../lib/underscoreJS/underscore.js"></script>
<script type="text/javascript" src="../lib/backboneJS/backbone.js"></script>
		
(2) VIE^2:

(2.1) Either the full source code (developer):

<script type="text/javascript" src="../src/core.js"></script>
<script type="text/javascript" src="../src/connector.js"></script>
<script type="text/javascript" src="../src/entity.js"></script>
<script type="text/javascript" src="../src/mapping.js"></script>

(2.2) Or the minimized version (production):

<script type="text/javascript" src="../dist/min/vie2-0.1.min.js"></script>

(3) The connectors to be used:

<script type="text/javascript" src="../src/connector-stanbol.js"></script>
<script type="text/javascript" src="../src/connector-rdfa.js"></script>

(4) The mappings to be used:

<script type="text/javascript" src="../src/mapping-person.js"></script>

Now we can enhance a certain DOM element via:

<script type="text/javascript">
	$(function () {
		var span = $('#test').vie2(); //instantiates this object in the VIE2 namespace!
		span.vie2('analyze', false);  //send the content of that object to *all* connectors!
		
		var matches = span.vie2('filter', 'person') //filter for persons
		.vie2('matches'); // retrieve persons as RDFEntities (Backbone.js model!)
		
		//print information of person (name|uri);
		jQuery.each(matches, function () {
			console.info("FOUND PERSON: " + this.get('name') + "|" + this.get('uri'));
		});
	});
			
	/**
	 * This outputs the following on the console:
	 * 
		VIE2.core Registered connector 'stanbol'
		VIE2.core Registered connector 'rdfa'
		VIE2.core Registered mapping 'person'
		VIE2.core Start analyze!
		VIE2.core Starting analysis with connector: 'stanbol'!
		VIE2.core Received RDF annotation from connector 'stanbol'!
		VIE2.core Starting analysis with connector: 'rdfa'!
		VIE2.Connector(rdfa) Object has no 'typeof' attribute! Trying to find children.
		VIE2.core Received RDF annotation from connector 'rdfa'!
		VIE2.core Finished task: 'analyze'!
		FOUND PERSON: "Michael Jackson"^^<http://www.w3.org/2001/XMLSchema#string>|<urn:enhancement-bbb47378-5ce3-d110-4e81-21660a7f41f4>
		FOUND PERSON: "Barack Obama"^^<http://www.w3.org/2001/XMLSchema#string>|<urn:enhancement-1c79376c-15b7-f6c6-4756-17c4a9db061c>
		FOUND PERSON: "Sebastian Germesin"|_:b279
	 */
</script>
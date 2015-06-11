
var intersect = require('semver-set').intersect;
var json = require('json-util');
var mapValues = require('lodash/object/mapValues');
var assign = require('lodash/object/assign');

function updateDependencies(dst, src) {
	return assign({ }, dst, mapValues(src, function(version, dep) {
		return has(dst, dep) ? intersect(dst[dep], version) : version;
	}));
}

function merge(source, target) {

	// Parse the input
	source = json.parse(source);
	target = json.parse(target);


	output.dependencies = updateDependencies(target.value.dependencies, source.value.dependencies);

	return json.stringify(output);
}

module.exports = merge;

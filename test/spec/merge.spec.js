
var fs = require('fs');
var path = require('path');
var merge = require('../../lib/merge');
var expect = require('chai').expect;

function fixture(name) {
	return fs.readFileSync(path.join(
		__dirname, '..', 'fixtures', name+'.fixture.json'
	), 'utf8');
}

describe('#merge', function() {

	it('should output valid JSON', function() {
		var result = merge(
			fixture('complete'),
			fixture('dependencies')
		);
		expect(function() {
			JSON.parse(result);
		}).to.not.throw();
	});

	it('should merge dependencies correctly', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));

		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});

	it('should maintain order of dependency packages', function () {
		var result = merge(
			fixture('complete'),
			fixture('dependencies')
		);
		var dependencySection = result.match(/\"dependencies\": \{([\s\S]*?)\}/m)[1];
		var dependencyNames = dependencySection.split("\n")
			.filter(function (line) {
				return line.trim().length > 0;
			})
			.map(function (line) {
				return line.match(/\"(.*)\":/)[1];
			});

		var sortedDependencies = Object.keys(JSON.parse(result).dependencies);
		sortedDependencies.sort();
		expect(dependencyNames).to.eql(sortedDependencies);
	});

	it('should work on emptiness', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));

		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});
});

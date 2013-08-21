module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			vendor: {
				files: {
					"public/js/vendor.js": [
						'bower_components/jquery/jquery.js',
						<% if(installBootstrap) { %> 'bower_components/bootstrap/js/*.js', <% } %>
					]
				}
			}
		},
		less: {
			options: {
				yuicompress: true	
			},
			vendor: {
				files: {
					"public/css/vendor.css": [
					<% if(installBootstrap) { %>	'bower_components/bootstrap/less/bootstrap.less', <% } %>
					]

				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['uglify','less']);
	grunt.registerTask('vendor', ['uglify:vendor','less:vendor']);
}

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      compile: {
        options: {
          paths: ['assets/css']
        },
        files: {
          'assets/css/style.css': 'assets/less/style.less'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);
};
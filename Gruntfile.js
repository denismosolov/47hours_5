'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      compile: {
        options: {
          paths: ['public/css']
        },
        files: {
          'public/css/style.css': 'public/less/style.less'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);
};
module.exports = function(grunt) {
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    watch: {
        scripts: {
            files: ["js/*.js", "less/*.less"],
            tasks: ["concat", "jshint", "less"],
            options: {
                nospawn: true,
            },
        },
    },
    jshint: {
        options: {
            eqeqeq: true, // use === 
            curly: true, // use curlybraces 
            //undef: true, // always use var before variables
            unused: true, // check for unused variables
            //strict: true, // use strict
        },
        target: {
          src: "public/main.js",
        },
    },
    less: {
        development: {
            files: {
                "public/style.css" : "main.less" // Destination CSS : Source LESS
            }
        }
    },
   concat: {
          js: {
            src: ["js/*.js"],
            dest: "public/main.js",
          },
          less: {
            src: ["less/*.less"],
            dest: "main.less",
          },
          options: {
              seperator: ";",
          },
      },
  });


  // load modules
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');


  // Setup task
  grunt.registerTask("default", ['concat', 'less', 'jshint', 'watch']);
};
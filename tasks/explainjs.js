/*
 * grunt-explainjs
 * https://github.com/collinforrester/grunt-explainjs
 *
 * Copyright (c) 2013 Collin Forrester
 * Licensed under the MIT license.
 */

'use strict';
var explainjs = require( 'explainjs' ),
    Handlebars = require( 'handlebars' );

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding tasks
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('explainjs', 'generate a side-by-side view of comments and code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      templatePath: 'node_modules/grunt-explainjs/tasks/templates/_out.hbs' // default template path
    });

    var done = this.async();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;
      explainjs(src, function(err, results) {
        if( err ) {
          grunt.log.error(err);
          done(err);
          return 1;
        }


        // Determine the output path from config
        var outputDir = ('' + f.dest).match(/.*\//)[0];

        // example scenario
        // actual path = app/scripts/file.js
        // output path = dist/explainjs/comments.html
        // this gives me ../../app/scripts/file.js
        var relativePathToSrcFile = (new Array( outputDir.split('/').length ).join('../')) + f.src;

        results.filename = options.showFilename? relativePathToSrcFile : '';

        var template = Handlebars.compile(grunt.file.read(options.templatePath)),
            html = template(results);

        // Write the destination file.
        grunt.file.write(f.dest, html);

        //copy css files
        grunt.file.copy('node_modules/grunt-explainjs/tasks/templates/css/explain.css', outputDir + 'css/explain.css');
        grunt.file.copy('node_modules/grunt-explainjs/tasks/templates/css/unsemantic.css', outputDir + 'css/unsemantic.css');

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
        done(null);
      });

    });
  });

};

# grunt-explainjs

> A grunt plugin to generate instant side-by-side view of your comments and code (thanks to [ExplainJS](http://www.explainjs.com)).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

`npm install grunt-explainjs --save-dev`


Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

`grunt.loadNpmTasks('grunt-explainjs');`

## The "explainjs" task

[Here](http://www.explainjs.com/explain?src=https%3A%2F%2Fraw.github.com%2Fcollinforrester%2Fgrunt-explainjs%2Fmaster%2Ftasks%2Fexplainjs.js) is [ExplainJS](http://www.explainjs.com) ran on this grunt plugin.

### Overview
In your project's Gruntfile, add a section named `explainjs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  explainjs: {
    dist: {
      options: {
        showFilename: true // default is false
      },
      files: [{
        src: ['dist/scripts/scripts.js'],
        dest: 'dist/explainjs/explain.html'
      }]
    },
  },
})
```

### Usage Examples

#### Default Options
By default, this plugin will take the file in `src` (works best with one) and run [ExplainJS](http://www.explainjs.com) on it, outputting the formatted results to the file specified in `dest`. I recommend using this at a point in your build process that happens after concatenation but before minification.

With the following config:
```js
grunt.initConfig({
  explainjs: {
    files: {
      'dist/explainjs/explain.html': ['dist/scripts/scripts.js'],
    },
  },
})
```

Your `build` task might look like this:

```js
grunt.registerTask('build', [
  'clean:dist',
  'jshint',
  'test',
  'compass:dist',
  'useminPrepare',
  'imagemin',
  'cssmin',
  'htmlmin',
  'concat', // concat files here, gives me dist/scripts/scripts.js (not minified)
  'explainjs', // explain here
  'copy',
  'usemin',
  'ngmin',
  'uglify'
]);
```
### Options
#### options.showFilename
Type: `Boolean`
Default value: `false`

Specifies whether or not to show (and include a link to) the file that ExplainJS was ran on.  In some (most?) cases that file will be minified or moved.  But if needed, the option is there.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
09/12/2013 - 0.0.2 Fixed pre tag generation, package.json typos (thanks kevmoo)
05/15/2013 - 0.0.1 initial release

module.exports = function(grunt) {
  grunt.file.setBase('src');

  grunt.initConfig({
    pkg: grunt.file.readJSON('grunt.json'),

    /* Clean */
    clean: {
      options: {
        force: true
      },
      build: ['<%= pkg.build %>/*'],
      jsdist: ['<%= pkg.dist %>/js/*.js', '!<%= pkg.dist %>/js/vendor/*'],
      cssdist: ['<%= pkg.dist %>/css'],
      imgdist: ['<%= pkg.dist %>/img'],
      resumedist: ['<%= pkg.dist %>/resume']
    },

    /* Sass Compile + Combine Media Queries + CSS Minify */
    sass: {
      target: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: '<%= pkg.build %>/css/sassout',
          ext: '.css'
        }]
      }
    },
    cmq: {
      options: {
        log: false
      },
      target: {
        files: {
          '<%= pkg.build %>/css/cmqout': ['<%= pkg.build %>/css/sassout/*.css']
        }
      }
    },
    cssmin: {
      options: {
        sourceMap: false
      },
      target: {
        files: [{
          expand: true,
          cwd: '<%= pkg.build %>/css/cmqout',
          src: ['*.css'],
          dest: '<%= pkg.dist %>/css',
          ext: '.min.css'
        }]
      }
    },

    /* JSHint + Concat + JS Minify */
    jshint: {
      files: ['js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    concat: {
      options: {
        separator: ';\n'
      },
      target: {
        src: ['js/utils.js', 'js/*.js'],
        dest: '<%= pkg.build %>/js/main.js'
      }
    },
    uglify: {
      options: {
        sourceMap: false,
        sourceMapName: '<%= pkg.dist %>/js/main.min.js.map'
      },
      target: {
        files: {
          '<%= pkg.dist %>/js/main.min.js': ['<%= pkg.build %>/js/main.js']
        }
      }
    },

    /* Imagemin */
    imagemin: {
      target: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= pkg.dist %>/img'
        }]
      }
    },

    /* Copy */
    copy: {},

    /* Modernizr */
    modernizr: {
      dist: {
        'dest': '<%= pkg.dist %>/js/vendor/modernizr.min.js',
        'options' : [
          'setClasses',
          'addTest',
          'html5printshiv',
          'testProp',
          'fnBind'
        ],
        'uglify': true,
        'tests': [],
        'excludeTests': [],
        'crawl': true,
        'useBuffers': false,
        'files' : {
          'src': [
            'js/**.js',
            'sass/main.scss'
          ]
        },
        'customTests': []
      }
    },

    /* Watch */
    watch: {
      sass: {
        files: 'sass/**',
        tasks: 'css'
      },
      js: {
        files: 'js/**',
        tasks: 'js'
      },
      img: {
        files: 'img/**',
        tasks: 'img'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['css', 'js', 'img']);

  grunt.registerTask('css', ['clean:cssdist', 'sass', 'cmq', 'cssmin', 'modernizr', 'clean:build']);
  grunt.registerTask('js', ['clean:jsdist', 'jshint', 'clean:jsdist', 'concat', 'uglify', 'modernizr', 'clean:build']);
  grunt.registerTask('img', ['clean:imgdist', 'imagemin']);

  grunt.registerTask('test', ['jshint']);
};

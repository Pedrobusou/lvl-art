module.exports = function(grunt) {
  // configuración del proyecto.
  grunt.initConfig({
    /*jshint: { // comprueba errores de sintáxis.
      all: ['scripts.js']
    },
    concat: { // fusiona varios archivos en uno.
      dist: {
        src: ['script1.js', 'script2.js', 'script3.js'],
        dest: 'unidos.js'
      }
    },
    uglify: { // comprime los archivos.
      dist: {
        src: 'unidos.js',
        dest: 'build/unidos.min.js'
      }
    },
    shell: { // ejecuta comandos del sistema.
      multiple: {
        command: [
          'del unidos.js',
          'mkdir deploy',
          'move build\\unidos.min.js deploy\\unidos.min.js'
        ].join('&&') // indica que se ejecuten varios comandos.
      }
    }*/
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');


  // tareas por defecto.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'shell']);
}

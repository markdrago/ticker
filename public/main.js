requirejs.config({
  packages: [
    {
      name: 'ticker',
      main: 'main'
    }
  ],
  paths: {
    'angular': 'vendor/angularjs/angular',
    'angular-route': 'vendor/angular-route/angular-route',
    'css': 'vendor/require-css/css',
    'socket': '/socket.io/socket.io.js',
    'underscore': 'vendor/underscore/underscore'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': ['angular'],
    'socket': {
      exports: 'io'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require([
  'angular',
  'socket',
  'css!ticker/stylesheets/main.css',
  'ticker'
], function(angular, io) {
  angular.bootstrap(document, ['ticker']);
});

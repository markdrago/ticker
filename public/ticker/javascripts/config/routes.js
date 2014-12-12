define([
  'ticker/module'
], function(module) {
  module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'tickerController',
        templateUrl: 'ticker/templates/ticker.html'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  }]);
});

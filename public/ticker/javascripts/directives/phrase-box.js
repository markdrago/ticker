  define([
  'ticker/module'
], function(module) {
  module.directive('phraseBox', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'ticker/templates/phrase-box.html',
      scope: {
        phrase: '='
      }
    };
  });
});

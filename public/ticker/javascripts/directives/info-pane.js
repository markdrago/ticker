define([
  'ticker/module'
], function(module) {
  module.directive('infoPane', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'ticker/templates/info-pane.html',
      controller: 'infoPaneController'
    };
  });

  module.controller('infoPaneController', ['$scope',
    'phraseService',
    'clientService',
    function($scope, phraseService, clientService) {
      $scope.phraseCounterInfo = phraseService.getPhraseCounterInfo;
      $scope.numClientsRunning = clientService.getNumberOfConnectedClients;
    }
  ]);
});

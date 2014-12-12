define([
  'ticker/module'
], function(module) {
  module.directive('phraseCreator', function() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        onPhraseAdded: '&'
      },
      templateUrl: 'ticker/templates/phrase-creator.html',
      controller: 'phraseCreatorController'
    };
  });

  module.controller('phraseCreatorController', [
    '$scope',
    'phraseService',
    'socketService',
    'Phrase',
    'Quote',
    function($scope, phraseService, socketService, Phrase, Quote) {
      $scope.quotes = [new Quote()];

      $scope.addPhrase = function() {
        var phrase = new Phrase({
          quotes: $scope.quotes
        });

        phraseService.addPhrase(phrase);

        socketService.emitNewPhraseMessage({
          quotes: $scope.quotes
        });

        $scope.quotes = [new Quote()];
        $scope.onPhraseAdded();
      };

      $scope.addQuote = function() {
        $scope.quotes.push(new Quote());
      };

      $scope.removeQuote = function(index) {
        $scope.quotes.splice(index, 1);
      };
    }
  ]);
});

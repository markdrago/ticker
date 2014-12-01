define([
  'ticker/module'
], function(module) {
  module.service('clientService', function() {
    var numClients = 0;

    var setNumberOfConnectedClients = function(num) {
      numClients = num;
    };

    var getNumberOfConnectedClients = function() {
      return numClients;
    };

    return {
      setNumberOfConnectedClients: setNumberOfConnectedClients,
      getNumberOfConnectedClients: getNumberOfConnectedClients
    };
  });
});

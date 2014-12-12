define([
  'ticker/module',
  'socket',
  'underscore'
], function(module, io, _) {
  module.service('socketService', ['phraseService', 'clientService', function(phraseService, clientService) {
    var socket;

    var initialize = function() {
      socket = io.connect('/', {
        'max reconnection attempts': Infinity
      });

      //simple phrase addition, add it to our list
      socket.on('add_phrase', function(data) {
        phraseService.addPhrase(data);
      });

      //response to an earlier bootstrap call, set all phrases
      socket.on('set_all_phrases', function(data) {
        if (_.isArray(data)) {
          phraseService.setPhrases(data);
          phraseService.retireOldPhrases();
          phraseService.refreshPhrases();
        }
      });

      //a request for all of our phrases, return them
      socket.on('get_phrases', function() {
        socket.emit('all_phrases', phraseService.getPhrases());
      });

      socket.on('num_clients', function(data) {
        clientService.setNumberOfConnectedClients(data.count);
      });

      //request our own bootstrapping
      socket.emit('bootstrap');
    };

    var emitNewPhraseMessage = function(phrase) {
      socket.emit('new_phrase', phrase);
    };

    return {
      initialize: initialize,
      emitNewPhraseMessage: emitNewPhraseMessage
    };
  }]);
});

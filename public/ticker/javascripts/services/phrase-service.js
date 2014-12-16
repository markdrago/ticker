define([
  'ticker/module'
], function(module) {
  module.service('phraseService', function() {
    var currentPhraseIndex = -1;
    var phrases = [];

    var getPhrases = function() {
      return phrases;
    };

    var getCurrentPhrase = function() {
      return phrases[currentPhraseIndex];
    };

    var setPhrases = function(newPhrases) {
      phrases = newPhrases;
      currentPhraseIndex = 0;
    };

    var addPhrase = function(phrase) {
      phrases.push(phrase);
      if (phrases.length === 1) {
        nextPhrase();
      }
    };

    var nextPhrase = function() {
      if (phrases.length > 0) {
        currentPhraseIndex++;

        if (currentPhraseIndex >= phrases.length) {
          retireOldPhrases();
          currentPhraseIndex = 0;
        }
      }
    };

    var previousPhrase = function() {
      if (phrases.length > 0) {
        currentPhraseIndex--;

        if (currentPhraseIndex < 0) {
          retireOldPhrases();
          currentPhraseIndex = phrases.length - 1;
        }
      }
    };

    var getPhraseCounterInfo = function() {
      return {
        current: currentPhraseIndex,
        total: phrases.length
      };
    };

    var retireOldPhrases = function() {
      var quoteLifetime = 60 * 60 * 24;
      var cutoff = 1000 * quoteLifetime;

      var now = new Date().getTime();
      var numRemoved = 0;

      phrases = phrases.filter(function(phrase, index, list) {
        var numLeft = phrases.length - numRemoved;
        if (numLeft <= 10) {
          return true;
        }

        //remove old phrases
        if (phrase.createdTime === undefined || phrase.createdTime < now - cutoff) {
          numRemoved++;
          phrases.splice(index, 1);
          return false;
        }

        return true;
      });

      return phrases;
    };

    return {
      getPhrases: getPhrases,
      getPhraseCounterInfo: getPhraseCounterInfo,
      getCurrentPhrase: getCurrentPhrase,
      setPhrases: setPhrases,
      addPhrase: addPhrase,
      nextPhrase: nextPhrase,
      previousPhrase: previousPhrase,
      retireOldPhrases: retireOldPhrases
    };
  });
});

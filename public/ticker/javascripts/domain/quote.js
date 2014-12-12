define([
  'ticker/module'
  ], function(module) {
    module.factory('Quote', function() {
      return function(obj) {
        if (obj) {
          this.author = obj.author;
          this.words = obj.words;
        }
      };
    });
  });

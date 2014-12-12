define([
  'ticker/module'
], function(module) {
  module.factory('Phrase', function() {
    return function(obj) {
      if (obj) {
        this.id = Math.floor(Math.random() * 1000000000);
        this.createdTime = new Date().getTime();
        this.quotes = obj.quotes;
      }
    };
  });
});

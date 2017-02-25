(function() {
    
    'use strict';
    
    angular
        .module("electedofficials")
        .factory("electedofficialsFactory", function($http, $firebaseArray) {
        
            
            var ref = new Firebase("https://electedofficials-4b77c.firebaseio.com");
        
        
            return {
                ref: $firebaseArray(ref)
            }
            
    });

}());
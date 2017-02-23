(function() {
    
    'use strict';
    
    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function($http, $firebaseArray) {
        
            
            var firebaseref = new Firebase("https://ngclassifieds-f2144.firebaseio.com");
        
        
            return {
                ref: $firebaseArray(firebaseref)
            }
            
    });

}());
(function() {

  "use strict";

  angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

      $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('orange');

      $urlRouterProvider.otherwise('/classifieds');

      $stateProvider
        .state('classifieds', {
          url: '/classifieds',
          templateUrl: 'components/classifieds/classifieds.tmpl.html',
          controller: 'classifiedsController as vm'
        })
        .state('classifieds.new', {
          url: '/new',
          templateUrl: 'components/classifieds/new/classifieds.new.tmpl.html',
          controller: 'newClassifiedsController as vm'
        })
        .state('classifieds.edit', {
          url: '/:id/edit',
          templateUrl: 'components/classifieds/edit/classifieds.edit.tmpl.html',
          controller: 'editClassifiedsController as vm',
          params: {
            classified: null
          }
        });
    });
    
})();
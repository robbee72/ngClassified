(function() {

  "use strict";

  angular
    .module('electedofficials', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

      $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('orange');

      $urlRouterProvider.otherwise('/electedofficials');

      $stateProvider
        .state('electedofficials', {
          url: '/electedofficials',
          templateUrl: 'components/electedofficials/electedofficials.tmpl.html',
          controller: 'electedofficialsController as vm'
        })
        .state('electedofficials.new', {
          url: '/new',
          templateUrl: 'components/electedofficials/new/electedofficials.new.tmpl.html',
          controller: 'newElectedofficialsController as vm'
        })
        .state('electedofficials.edit', {
          url: '/:id/edit',
          templateUrl: 'components/electedofficials/edit/electedofficials.edit.tmpl.html',
          controller: 'editElectedofficialsController as vm',
          params: {
            id: null
          }
        });
    });
    
})();
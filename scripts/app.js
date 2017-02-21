angular
    .module("ngClassifieds", ["ngMaterial", "ui.router"])
    .config(function($mdThemingProvider, $stateProvider) {
        
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('light-blue');
        
        $stateProvider
            .state('classifieds', {
                url:'/classifieds',
                templateUrl: 'components/classifieds/classifieds.tmpl.html',
                controller: 'classifiedsCtrl as vm'
        });
});
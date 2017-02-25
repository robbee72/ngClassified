(function() {

  "use strict";

  angular
    .module('electedofficials')
    .controller('electedofficialsController', function($scope, $mdSidenav, $mdDialog, $state, $mdToast, electedofficialsFactory) {

      var vm = this;

      vm.openSidebar = openSidebar;
      vm.showFilters = false;
      
      vm.electedofficials = electedofficialsFactory.ref; vm.electedofficials.$loaded().then(function(electedofficials) {
        vm.categories = getCategories(electedofficials);
      });

      $scope.$on('newElectedofficial', function(event, data) {
        vm.electedofficials.$add(data);
        showToast('Electedofficial Saved');
      });

      $scope.$on('editSaved', function(event, message) {
        showToast(message);
      });

      vm.sidebarTitle;

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }

      function openSidebar() {
        vm.sidebarTitle = 'Add an Elected official';
        $state.go('electedofficials.new');
      }

      function getCategories(electedofficials) {

        var categories = [];

        angular.forEach(electedofficials, function(ad) {
          angular.forEach(ad.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }

    });

})();
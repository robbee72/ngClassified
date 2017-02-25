(function() {

  "use strict";

  angular
    .module('electedofficials')
    .controller('editElectedofficialsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, electedofficialsFactory) {

      var vm = this;

      vm.electedofficials = electedofficialsFactory.ref;
      vm.electedofficial = vm.electedofficials.$getRecord($state.params.id);
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;

      vm.sidebarTitle = 'Edit Elected Official';

      $timeout(function() {
        $mdSidenav('left').open();    
      });

      $scope.$watch('sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('electedofficials');
          });
        }
      });

      // Case 1 - close the sidenav and change state manually
      // function closeSidebar = function() {
      //   vm.electedofficial = {};
      //   $mdSidenav('left')
      //     .close()
      //     .then(function() {
      //       $state.go('electedofficials');
      //   });      
      // }

      // Case 2 - simply use the watcher to move state
      function closeSidebar() {
        vm.electedofficial = {};
        $scope.sidenavOpen = false;        
      }

      function saveEdit() {
        vm.electedofficials.$save(vm.electedofficial).then(function() {
          $scope.sidenavOpen = false;
          $scope.$emit('editSaved', 'Edit Saved');
        });
      }

    });

})();

(function() {

  "use strict";

  angular
    .module('electedofficials')
    .controller('newElectedofficialsController', function( $state, $scope, $mdSidenav, $mdDialog, $timeout, electedofficialsFactory) {

      var vm = this;

      vm.closeSidebar = closeSidebar;
      vm.saveElectedofficial = saveElectedofficial;

      vm.sidebarTitle = 'Add an Elected Official';

      // We need a watcher to trigger the sidenav
      // opening and closing
      $scope.$watch('sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('electedofficials');
          });
        }
      });

      $timeout(function() {
        $mdSidenav('left').open();     
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

      function saveElectedofficial(electedofficial) {
        if(electedofficial) {

          electedofficial.contact = {
            name: "Ryan Chenkie", 
            phone: "(555) 555-5555",
            email: "ryanchenkie@gmail.com"
          }
          
          
          $scope.$emit('newElectedofficial', electedofficial)          
          $scope.sidenavOpen = false;
        }
      }


    });

})();
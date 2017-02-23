
(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;
      vm.classifieds =classifiedsFactory.ref;
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;
      vm.sidebarTitle = 'Edit Classifed';
      vm.classified = vm.classifieds.$getRecord($state.params.id);

      $timeout(function() {
        $mdSidenav('left').open();    
      });

      $scope.$watch('sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('classifieds');
          });
        }
      });

      function closeSidebar() {
        vm.sidenavOpen = false;        
      }

      function saveEdit() {
        vm.classifieds.$save(vm.classified).then(function() {
            $scope.sidenavOpen = false;
            $scope.$emit('editSaved', 'Edit Saved');  
        });
         
      }


    });

})();
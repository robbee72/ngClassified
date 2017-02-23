(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('classifiedsController', function($scope, $mdToast, $mdSidenav, $mdDialog, $state, $stateParams, classifiedsFactory) {

      var vm = this;

      vm.openSidebar = openSidebar;
    //  vm.editClassified = editClassified;
     // vm.deleteClassified = deleteClassified;
      vm.showSearchBar = false;
      vm.showFilters = false;
      
      vm.classifieds = classifiedsFactory.ref;
      vm.classifieds.$loaded().then(function(classifieds) {
          vm.categories =getCategories(classifieds);
      });
//      classifiedsFactory.getClassifieds().then(function(data) {
//        vm.classifieds = data.data;
//        vm.categories = getCategories(vm.classifieds);
//      });

      $scope.$on('newClassified', function(event, classified) {  
        vm.classifieds.$add(classified);
        showToast('Classified Saved');
      });

      $scope.$on('editSaved', function(event, message) {
        showToast(message);
      });

      vm.sidebarTitle;

      

      function openSidebar() {
        vm.sidebarTitle = 'Add a Classified';
        $state.go('classifieds.new');
      }

      function saveEdit() {
          vm.editing = false;
          vm.classifieds = {};
          closeSidebar();
          showToast("Edit saved!");
          
      }
      
      
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
        vm.sidebarTitle = 'Add a Classified';
        $state.go('classifieds.new');
      }
            
            
            
      function getCategories(classifieds) {

        var categories = [];

        angular.forEach(classifieds, function(ad) {
          angular.forEach(ad.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }
  // upload to firebase     
  //   var data = []
  //    var firebase = classifiedsFactory.ref;
  //   angular.forEach(data, function(item){
  //        firebase.$add(item);
  //    });

    });

})();
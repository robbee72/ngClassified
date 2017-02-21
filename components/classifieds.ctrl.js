(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('classifiedsController', function($scope, $mdSidenav, $mdDialog, $mdToast, classifiedsFactory) {

      var vm = this;
      vm.categories = categories;
      vm.classified = classified;
      vm.classifieds = classifieds;
      vm.editing = editing;
      vm.editClassified = editClassified;
      vm.deleteClassified = deleteClassified;
      vm.openSidebar = openSidebar;
      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified
      
      
      classifiedsFactory.getClassifieds().then(function(data) {
        vm.classifieds = data.data;
        vm.categories = getCategories(vm.classifieds);
      });

      var contact = {
        name: "Tiger Woods", 
        phone: "(555) 555-5555",
        email: "tw@gmail.com"
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }

      function openSidebar () {
        $mdSidenav('left').open();
      }

      function closeSidebar () {
        $mdSidenav('left').close();
      }

      function saveClassified (classified) {
        if(classified) {
          vm.classified.contact = contact;
          vm.classifieds.push(classified);
          vm.classified = {};
          vm.closeSidebar();
          showToast('Classified Saved');
        }
      }

       function editClassified (classified) {
        vm.editing = true;
        vm.sidebarTitle = 'Edit Classified';
        vm.classified = classified;
        $mdSidenav('left').open();
      }

      function saveEdit () {
        vm.editing = false;
        // Need to clear the form after, or else it will be populated when we go to add new classifieds
        vm.classified = {};
        $mdSidenav('left').close();
        showToast('Edit Saved');
      }

      function deleteClassified (event, classified) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + classified.title + '?')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
          var index = vm.classifieds.indexOf(classified);
          vm.classifieds.splice(index, 1);
          showToast('Classified Deleted');
        }, function() {
          vm.status = classified.title + ' is still here.';
        });
      };

    });
    
    function getCategories(classifieds) {

        var categories = [];

        angular.forEach(classifieds, function(ad) {
          angular.forEach(ad.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }

})();
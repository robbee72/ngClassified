(function() {

  "use strict";

  angular
    .module("electedofficials")
    .directive("electedofficialCard", function() {
      return {
        templateUrl: "components/electedofficials/card/electedofficial-card.tmpl.html",
        scope: {
          electedofficials: "=",
          electedofficialsFilter: "=searchFilter",
          category: "=categoryFilter"
        },
        controller: electedofficialCardController,
        controllerAs: 'vm'
      }

      function electedofficialCardController( $scope, $state, $mdDialog) {

        var vm = this;

        vm.editElectedofficial = editElectedofficial;
        vm.deleteElectedofficial = deleteElectedofficial;
    

        function editElectedofficial(electedofficial) {
          vm.editing = true;
          vm.sidebarName = 'Edit Elected Official';
          $state.go('electedofficials.edit', { id: electedofficial.$id });
        }

        function deleteElectedofficial(event, electedofficial) {
          var confirm = $mdDialog.confirm()
              .name('Are you sure you want to delete ' + electedofficial.name + '?')
              .targetEvent(event)
              .ok('Yes')
              .cancel('No');
          $mdDialog.show(confirm).then(function() {
              $scope.electedofficials.$remove(electedofficial);
          }, function() {

          });
        }

        function showToast(message) {
          $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position('top, right')
              .hideDelay(3000)
          );
        }

      }
    });
})();
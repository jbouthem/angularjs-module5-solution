(function () {
  "use strict";

  angular.module('common')
  .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        console.log("Categories: ", response.data);
        return response.data;
      });
    };

    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = {'category': category};
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        console.log("returned response - getMenuItems: ", response.data);
        return response.data;
      });
    };

    service.getMenuItem = function (shortName) {
      var item = {};

      console.log("getMenuItem: ", shortName);

      return $http({
          method: "GET",
          url: (ApiPath + "/menu_items.json")
        }).then(function (response) {
          item = response.data;
          item.menu_items = response.data.menu_items.filter(e => e.short_name === shortName);
          console.log("returned response - getMenuItem: ", item.menu_items);
          return item;
        });
    };
  }
})();

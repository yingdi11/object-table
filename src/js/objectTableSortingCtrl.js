angular.module('objectTable').controller('objectTableSortingCtrl', ['$scope',
	function angTableCtrl($scope) {


		/* sorting [START]*/

		$scope.sort = {
                    fields: [], // array to store readable sorted headers
                    reverse: [] // array to store reversing for each field
                };

                $scope.sortingArray = [];

                $scope.sortBy = function(field) {
                	if ($scope.data.length) {
                        var sortedHeader= $scope.headers[$scope.fields.indexOf(field)];
                        if ($scope.sortingType == 'compound') {
                           
                           if ($scope.sort.fields.indexOf(sortedHeader) == -1) {
                            $scope.sort.fields.push(sortedHeader);
                            $scope.sortingArray.push(field);
                            $scope.sort.reverse.push(false);
                        } else {
                         $scope.changeReversing(field, $scope.sort.fields.indexOf(sortedHeader));
                     }

                 } else if ($scope.sortingType == 'simple') {
                   $scope.sort.fields = [sortedHeader];
                   $scope.changeReversing(field);

               }
           }

       };

       $scope.changeReversing = function(sortProperty, indexOfHeader){
        if ($scope.sortingType == 'compound') {

            $scope.sort.reverse[indexOfHeader] = !$scope.sort.reverse[indexOfHeader];
            if ($scope.sort.reverse[indexOfHeader]) {
                $scope.sortingArray[indexOfHeader] = "-" + sortProperty;
            } else {
                $scope.sortingArray[indexOfHeader] = sortProperty;
            };

        }else if ($scope.sortingType == 'simple') {
            $scope.sort.reverse[0] = !$scope.sort.reverse[0];

            if ($scope.sort.reverse[0]) {
                $scope.sortingArray = [sortProperty];
            } else {
                $scope.sortingArray = ["-" + sortProperty];
            };

        }
    };

    /* highlight sorted headers */
    $scope.headerIsSortedClass = function(field) {
     if (!$scope.sortingArray.length) return;

     if ($scope.sortingType == 'simple') {
      if (field == $scope.sort.fields[0] || "-" + field == $scope.sort.fields[0]) {
       if ($scope.sort.reverse[0]) {
        return 'table-sort-down';
    } else {
        return 'table-sort-up';
    }
}
} else if ($scope.sortingType == 'compound') {
  var rowIndex = $scope.sort.fields.indexOf(field);
  if (rowIndex != -1) {
   if ($scope.sort.reverse[rowIndex]) {
    return 'table-sort-down';
} else {
    return 'table-sort-up';
}
}
}
};

/* COMPOUND SORTING: remove from array */
$scope.removeSorting = function() {
 var index = $scope.sort.fields.indexOf(this.sortField);
 if (index > -1) {
  $scope.sort.fields.splice(index, 1);
  $scope.sort.reverse.splice(index, 1);
  $scope.sortingArray.splice(index, 1);
}
};
/* sorting [END]*/

}]);
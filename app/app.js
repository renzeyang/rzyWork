const app = angular.module("myApp",[]);

app.directive("index",function(){
	return {
		templateUrl:"app/view/index.html",
		controller:"indexCtr"
	}
})

app.controller("indexCtr",function($scope){
    $scope.index_num = 0
    $scope.index_price = 0
    $scope.flag = false
    $scope.dj = function(){
    	$scope.flag = !$scope.flag 
    	$scope.$emit('qx',$scope.flag )
    }

    $scope.$on("num",function(even,data){
    	var ind = 0
    	var jg = 0
    	$.each(data,function(i,val){
    		if(val.flag){
    			ind += val.value
    			jg += val.value*val.price
    		}
    	})
    	$scope.index_num = ind
    	$scope.index_price = jg
 
        var number = 0;
    	$.each(data,function(i,val){
    		if(val.flag){
    			number++
    		}
    	})
    	if(number==data.length){
            $scope.flag = true
            $('#che').prop("checked",true);
    	}else{
    		$scope.flag = false
    		$('#che').prop("checked",false);
    	}
    })
})









app.directive("content",function(){
	return {
		templateUrl:"app/view/content.html",
		controller:"contentCtr",
		link:function(scope){
		}
	}
})

app.controller("contentCtr",["$scope","server",function($scope,server){
    server.getData("json/content.json").then(function(data){
    	$scope.data=data
    })
    $scope.fn1=function(ind){
	  ind.value++
	  if(ind.value>=9){
	  	ind.value=9
	  }
	  ind.num = ind.value * ind.price
	  dy(ind.value)
    }
    $scope.fn2=function(ind){
	  ind.value--
	  if(ind.value<=0){
	  	ind.value=1
	  }
	  ind.num = ind.value * ind.price
	  dy(ind.value)
    }
    function dy(){
      $scope.$emit('num',$scope.data)
    }

    $scope.che=function(ind){

      ind.flag = !ind.flag

      $scope.$emit('num',$scope.data)
    }

    $scope.$on("qx",function(even,flag){
      $.each($scope.data,function(i,val){
      	 val.flag=flag
      })
      $('.check').each(function(i,val){
      	$(val).prop("checked", flag);
      })
      $scope.$emit('num',$scope.data)
    })
}])


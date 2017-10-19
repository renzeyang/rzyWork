app.factory("server",function($q,$http){
    return {
    	getData:function(url,type){
    		var df = $q.defer()
    		if(type=="jsonp"){
               $.ajax({
               	url:url,
               	success:function(data){
 					df.resolve(data)
               	}
               })
    		}else{
               $http({
               	url:url
               }).then(function(data){
               		df.resolve(data.data)
               })
    		}
    		return df.promise
    	}
    }
})
var app = angular.module('zoomPlugin',[]);

app.controller('myCtrl', function($scope, $timeout) {
	$scope.imageSrc = 'rockymountain.jpg';
	$scope.zoomElmWrapper = document.getElementsByClassName('imageZoom')[0];
	$scope.imagePosLeft = 0;
	$scope.imagePosTop = 0;
	$timeout(function(){
		$scope.imgOriginalWidth = document.getElementsByClassName('zoomedImage')[0].naturalWidth;
	}, 1000);
	$scope.magnify = 1;
	$scope.mouseDownToMove = false;
	$scope.mouseDownX = 0;
	$scope.mouseDownY = 0;
	$scope.windowWidth = window.innerWidth;
	$scope.windowHeight = window.innerHeight;
	$scope.preventMoveOuterRadius = 200;
	$scope.zoomInOut = function($event){
		$scope.magnify  = ($scope.magnify == 1) ? 2 : 1;
		$timeout(function(){
			if($scope.magnify == 2){
				var ePageX = $event.pageX;
				var ePageY = $event.pageY;
				var wrapperOfsetLeft = $scope.zoomElmWrapper.getBoundingClientRect().left;
				var wrapperOfsetTop = $scope.zoomElmWrapper.getBoundingClientRect().top;
				var clickedX = ePageX - wrapperOfsetLeft;
				var clickedY = ePageY - wrapperOfsetTop;
				var zoomedWidth = $scope.zoomElmWrapper.getBoundingClientRect().width;
				var zoomedHeight = $scope.zoomElmWrapper.getBoundingClientRect().height;
				$scope.imagePosLeft = -(clickedX-wrapperOfsetLeft);
				$scope.imagePosTop = -(clickedY-wrapperOfsetTop);
			}else {
				$scope.imagePosLeft = 0;
				$scope.imagePosTop = 0;
			}
		},10);
	};
	$scope.mouseDown = function($event){
		$event.preventDefault();
		$scope.mouseDownToMove = true;
		var wrapperOfsetLeft = $scope.zoomElmWrapper.getBoundingClientRect().left;
		var wrapperOfsetTop = $scope.zoomElmWrapper.getBoundingClientRect().top;
		$scope.mouseDownX = $event.pageX-wrapperOfsetLeft;
		$scope.mouseDownY = $event.pageY-wrapperOfsetTop;
	};
	$scope.mouseLeave = function($event){
		if($scope.mouseDownToMove){
			$scope.mouseDownToMove = false;
		}
	};
	$scope.move = function($event){
		$event.preventDefault();
		if($scope.mouseDownToMove){
			var ePageX = $event.pageX;
			var ePageY = $event.pageY;
			if(ePageX > $scope.preventMoveOuterRadius && ePageX < ($scope.windowWidth-$scope.preventMoveOuterRadius) && ePageY > $scope.preventMoveOuterRadius && ePageY < ($scope.windowHeight-$scope.preventMoveOuterRadius)){
				$scope.imagePosLeft = (ePageX - $scope.mouseDownX);
				$scope.imagePosTop = (ePageY - $scope.mouseDownY);
			}
		}
	};
	$scope.mouseUp = function($event){
		$event.preventDefault();
		$scope.mouseDownToMove = false;
		$scope.mouseDownX = 0;
		$scope.mouseDownY = 0;
	};
	
	window.addEventListener('load', function(){
		var zoomElm = document.getElementsByClassName('imageZoom')[0];
		zoomElm.addEventListener('touchmove', function(e){
			$scope.preventMoveOuterRadius = 5;
			var ePageX = Math.round(e.changedTouches[0].pageX);
			var ePageY = Math.round(e.changedTouches[0].pageY);
			if(ePageX > $scope.preventMoveOuterRadius && ePageX < ($scope.windowWidth-$scope.preventMoveOuterRadius) && ePageY > $scope.preventMoveOuterRadius && ePageY < ($scope.windowHeight-$scope.preventMoveOuterRadius)){
				$timeout(function(){
					$scope.imagePosLeft = (ePageX - $scope.mouseDownX);
					$scope.imagePosTop = (ePageY - $scope.mouseDownY);
				});
			}
			e.preventDefault()
		}, false)
	 
	}, false)
});
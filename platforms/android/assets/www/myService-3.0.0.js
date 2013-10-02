



cordova.define(	'cordova/plugin/myService',	function(require, exports, module) {
												CreateBackgroundService('com.racetracker.positionservice.MyService', require, exports, module);
											});


function PositionService(){

}

PositionService.prototype = {
        service: cordova.require('cordova/plugin/myService'),

        start: function(){
            service.startService(that.success, that.error );
        },
        stop: function(){
            service.stopService(that.success, that.error )
        },
        enableTimer: function(millisec){
            service.enableTimer(millisec, that.success, that.error);
        },
        disableTimer: function(){
            service.disableTimer(millisec, that.success, that.error);
        },
        getStatus: function(){
            service.getStatus(that.success, that.error);
        },
        success: function(data){
            str = JSON.stringify(data);
            console.log("success: " + str)
        },
        error: function(error){
            alert("error: " + JSON.stringify(data));
        }
}







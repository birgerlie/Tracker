
function RaceManager(){
    this.raceId  = undefined;
    this.selected_mark = undefined;
    this.marks = []
}

function RaceManager(raceId, raceName){
    this.raceId  = raceId;
    this.selected_mark = undefined;
    this.raceName= undefined;
    this.marks = []
}


RaceManager.prototype.loadRegattas = function(callBack){

    $.ajax({
        url: server + "?format=json",
        type:"get",
        type:"get",
        data:{},
        contentType:"application/x-www-form-urlencoded; charset=utf-8",
        success: callBack
        });
}


RaceManager.prototype.buildData = function(position){
    return {
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        hdg:position.coords.heading,
        speed:position.coords.speed,
        utc : position.timestamp,
        id : yacht,
        nr : sail_number,
        skipper : skipper,
        race: this.raceId
        }
}



RaceManager.prototype.reportPosition =  function(data){
    $.ajax({
        url:server + "/pos",
        type:"POST",
        data: data,
        contentType:"application/x-www-form-urlencoded; charset=utf-8",
        success: function(){
            console.log('transmit success')
        }
    });
}


RaceManager.prototype.setWindAngle = function(){

    <!--navigator.compass.getCurrentHeading(this.compassSuccess, this.compassError, compassOptions);-->
}

RaceManager.prototype.compassError =  function(error){
    alert('Compass Error: ' + compassError.code);
}

RaceManager.prototype.compassSuccess =  function (heading){
   wind_angle = heading.magneticHeading;
   $("#btn-set-wind").text('TWA: ' + wind_angle)
}


RaceManager.prototype.updateMarkPosition = function (){
    console.log('update mark ' + selected_mark)
}

RaceManager.prototype._setMarksCallBack = function (data){
    this.marks = data.marks
    this.loadMarkCallBack(this.marks)
}

RaceManager.prototype.getRaceMarks = function (callBack){
    this.marks = undefined;
    this.selected_mark = undefined;
    this.loadMarkCallBack = callBack;
    url = server + "/create?id=" + this.raceId +  "&format=json";
    var loaded_marks = [];
    if(this.raceId != undefined){
        $.ajax({
        url: url,
        type:"get",
        type:"get",
        data:{},
        context: this,
        contentType:"application/x-www-form-urlencoded; charset=utf-8",
        success: this._setMarksCallBack
        });
    }
}

RaceManager.prototype.setMarkPosition = function(markId){
    this.selected_mark = marks[markId]
    console.log(this.selected_mark)
}
var hours = [ '12','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
var minutes = ['30','35', '40', '45', '50', '55', '00', '05', '10', '15', '20', '25'];
var hourIndex = 8;
var minuteIndex = 4;
var clock = document.getElementById("clock");
var leftPerm = [0,2,3,4,5,6,7,8,9,10,11,1];
var rightPerm = [0,11,1,2,3,4,5,6,7,8,9,10];
var upPerm = [11,10,5,7,8,2,9,3,4,6,1,0];
var downPerm = [11,10,5,7,8,2,9,3,4,6,1,0];

function display() {
    clock.innerHTML = 'Press the arrow keys to change the time. <br> Can you set the clock to midnight? <br><br><br>'+hours[hourIndex] + ':' + minutes[minuteIndex] + '<br>';
}

document.addEventListener('keyup',(e) =>{
    if (e.keyCode == '38') {
        hourIndex = upPerm[hourIndex];
        minuteIndex = upPerm[minuteIndex];
    }
    else if (e.keyCode == '40') {
        hourIndex = downPerm[hourIndex];
        minuteIndex = downPerm[minuteIndex];
    }
    else if (e.keyCode == '37') {
        hourIndex = upPerm[leftPerm[hourIndex]];
        minuteIndex = upPerm[leftPerm[minuteIndex]];
    }
    else if (e.keyCode == '39') {
        hourIndex = rightPerm[downPerm[hourIndex]];
        minuteIndex = rightPerm[downPerm[minuteIndex]];
    }
    display();
})

display();

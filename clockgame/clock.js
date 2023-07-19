var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var minutes = ['35', '40', '45', '50', '55', '00', '05', '10', '15', '20', '25', '30'];
var hourIndex = 0;
var minuteIndex = 0;
var clock = document.getElementById("clock");
var leftPerm = [6,4,10,5,1,3,0,9,11,7,2,8];
var rightPerm = [6,4,10,5,1,3,0,9,11,7,2,8];
var upPerm = [4,5,6,7,8,9,10,11,0,1,2,3];
var downPerm = [8,9,10,11,0,1,2,3,4,5,6,7];
var perms = [leftPerm,rightPerm,upPerm,downPerm];

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
        hourIndex = leftPerm[hourIndex];
        minuteIndex = leftPerm[minuteIndex];
    }
    else if (e.keyCode == '39') {
        hourIndex = rightPerm[hourIndex];
        minuteIndex = rightPerm[minuteIndex];
    }
    display();
})

display();

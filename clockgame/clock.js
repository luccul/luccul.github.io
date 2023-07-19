var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var minutes = ['35', '40', '45', '50', '55', '00', '05', '10', '15', '20', '25', '30'];
var hourIndex = 2;
var minuteIndex = 8;
var clock = document.getElementById("clock");
var leftPerm = [11,10,5,7,8,2,9,3,4,6,1,0];
var rightPerm = [11,10,5,7,8,2,9,3,4,6,1,0];
var upPerm = [10,5,7,8,2,9,3,4,6,1,11,0];
var downPerm = [11,9,4,6,7,1,8,2,3,5,0,10];
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

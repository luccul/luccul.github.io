var numRows = 4;
var numCols = 4;
var board = document.getElementById("board"); 
var hintBar = document.createElement("div");
var dictionaryBar = document.createElement("div");
var cells = [];
var tiles = [];
var rows = [];
var solution = "";
var hints = 0;
var swaps = 0;
var elapsed = 0;
var startTime = 0;
var endTime = 0;
var statState = 0;
var activeIndex = -1;
var celebrated = false;

function initialize(){
    solution = solutions[Math.floor(Math.random()*solutions.length)];
    for(let i=0;i<numRows;i++){
        rows.push(document.createElement("div"));
        row = rows[i];
        row.className = "row";
        board.appendChild(row);
        for(let j=0;j<numCols;j++){
            let cellIndex = j+i*numCols;
            tiles.push({});
            cells.push({});
            tiles[cellIndex].letter = solution.split(" ").join("").toUpperCase()[cellIndex];
            tiles[cellIndex].bgcolor = "white";
            tiles[cellIndex].textcolor = "black";
            tiles[cellIndex].outlinecolor = "#666";
            tiles[cellIndex].cursor = "pointer";
            tiles[cellIndex].cellIndex = cellIndex;
            tiles[cellIndex].isRevealed = false;
            cells[cellIndex].element = document.createElement("div");
            cells[cellIndex].element.id = cellIndex.toString();
            cells[cellIndex].element.className = "cell";
            cells[cellIndex].element.onclick = function(c){return function(){activate(c);};}(cellIndex);
            cells[cellIndex].tileIndex = cellIndex;    
            row.appendChild(cells[cellIndex].element);
        }
    }
    hintBar.className = "bar";
    hintBar.innerHTML = "HINT";
    hintBar.onclick = function(){hint();};
    hintBar.style.backgroundColor='white';
    hintBar.style.color = 'black';
    hintBar.style.borderColor = '#666';
    dictionaryBar.className = "bar";
    dictionaryBar.innerHTML = "WORDS";
    dictionaryBar.onclick = function(){showDictionary();};
    dictionaryBar.style.backgroundColor='white';
    dictionaryBar.style.color = 'black';
    dictionaryBar.style.borderColor = '#666';
    board.after(hintBar);
    hintBar.after(dictionaryBar);
    shuffle();
    display();
    startTime = Date.now();
}

function swap(tileIndex1,tileIndex2){
    let cellIndex1 = tiles[tileIndex1].cellIndex;
    let cellIndex2 = tiles[tileIndex2].cellIndex;
    tiles[tileIndex1].cellIndex = cellIndex2;
    tiles[tileIndex2].cellIndex = cellIndex1;
    cells[cellIndex1].tileIndex = tileIndex2;
    cells[cellIndex2].tileIndex = tileIndex1;
}        

function shuffle(){
    cells.forEach(cell=>swap(cell.tileIndex,Math.floor(Math.random()*numRows*numCols)));
}       

function display(){
    tiles.forEach(tile=>{
        let cell = cells[tile.cellIndex]; 
        cell.element.style.transition = 'all 0s';
        cell.element.innerHTML = tile.letter;
        cell.element.style.backgroundColor = tile.bgcolor;
        cell.element.style.border = "2px solid "+tile.outlinecolor;
        cell.element.style.color = tile.textcolor;
        cell.element.style.cursor = tile.cursor;
    });
}

function isRevealed(tileIndex){
    return tiles[tileIndex].isRevealed;
}

function activate(cellIndex){
    let tileIndex = cells[cellIndex].tileIndex;
    if(!isRevealed(tileIndex)){
        console.log(tiles[tileIndex]);
        if(activeIndex==-1){
            tiles[tileIndex].outlinecolor = '#FCC201';
            tiles[tileIndex].cursor = 'default';
            activeIndex = tileIndex;
            display();
        }else{
            if(tileIndex != activeIndex){
                swaps += 1;
            }
            swap(tileIndex,activeIndex);
            deactivate();            
            display();
        }
    }
    if(finished()){
        celebrate();
    }
}

function deactivate(){
    tiles[activeIndex].outlinecolor='#666';
    tiles[activeIndex].cursor='pointer';
    activeIndex = -1;
}

function finished(){
    let word = ""
    for(let i=0;i<numRows;i++){
        for(let j=0;j<numCols;j++){
            word += tiles[cells[j+i*numCols].tileIndex].letter;
        }
        if(!dictionary.has(word.toLowerCase())){
            return false;
        }
        word="";
    }
    for(let j=0;j<numCols;j++){
        for(let i=0;i<numRows;i++){
            word += tiles[cells[j+i*numCols].tileIndex].letter;
        }
        if(!dictionary.has(word.toLowerCase())){
            return false;
        }
        word = "";
    }
    return true;
}

function hint(){
    if(activeIndex != -1){
        deactivate();
    }
    let hintIndex = Math.floor(Math.random()*numCols + numCols*Math.floor(Math.random()*numRows));
    if(isRevealed(hintIndex)){
        hint();
    }else{
        tiles[hintIndex].bgcolor = 'black';
        tiles[hintIndex].textcolor = 'white';
        tiles[hintIndex].outlinecolor = 'black';
        tiles[hintIndex].cursor = 'default';
        tiles[hintIndex].isRevealed = true;
        swap(hintIndex,cells[hintIndex].tileIndex);
        hints += 1;
        display();
    }
    if(finished()){
        celebrate();
    }
}

function celebrate(){
    if(!celebrated){
        endTime = Date.now();
        celebrated = true;
        display();
        hintBar.onclick = function(){};
        hintBar.style.cursor = 'default';
        hintBar.style.transition = 'all 1.5s';
        dictionaryBar.onclick = function(){};
        dictionaryBar.style.cursor = 'default';
        dictionaryBar.style.transition = 'all 1.5s';
        hintBar.style.opacity = 0;
        dictionaryBar.style.opacity = 0;
        tiles.forEach(tile=>{
            let cell = cells[tile.cellIndex];
            if(cell.tileIndex==activeIndex){
                cell.element.style.backgroundcolor='white';
            }
            if(!tiles[cell.tileIndex].isRevealed){
                cell.element.style.border ='2px solid #FFF';
                cell.element.style.transition = 'all 3s';
                cell.element.style.backgroundColor = '#FCC201';
                cell.element.style.border = '2px solid #FCC201';
                cell.element.style.color = 'black';
            }else{
                cell.element.style.backgroundColor = 'black';
                cell.element.style.color = 'white';
            }
            cell.element.style.cursor = 'default';
            cell.element.onclick = function(){};
        })
        setTimeout(function(){
            hintBar.style.opacity = 1;
            dictionaryBar.style.opacity = 1;
            hintBar.innerHTML = "STATISTICS";
            hintBar.onclick = function(){toggleStats();};
            hintBar.style.cursor = 'pointer';
            dictionaryBar.innerHTML = "PLAY AGAIN";
            dictionaryBar.onclick = function(){again();};
            dictionaryBar.style.cursor = 'pointer';
        },1500);
        try{
                        fetch('https://docs.google.com/forms/d/e/1FAIpQLScuAhejd5Ynj2T9WYhl_Y90UotsZ22Sl4jDRaQ5I1tuPibkrg/formResponse?entry.34160038='+solution+'&entry.1571849764='+hints+'&entry.1236799835='+(Math.floor(elapsed/1000)).toString()+'&entry.843405783='+swaps);
        }finally{
        }
    }
    
}

function again(){
    cells.forEach(cell=>cell.element.remove());
    cells = [];
    tiles = [];
    rows.forEach(row=>row.remove());
    rows = [];
    solution = "";
    hints = 0;
    swaps = 0;
    activeIndex = -1;
    celebrated = false;
    initialize();
}

function toggleStats(){
    if(statState==0){
        elapsed = endTime-startTime;
        seconds = (Math.floor(elapsed/1000)).toString();
        if(seconds == 1){
            timeString = '1 SECOND';
        }else{
            timeString = seconds+' SECONDS';            
        }
        if(seconds>120){
            minutes = (Math.floor(elapsed/60000)).toString();
            timeString = minutes+' MINUTES';
            if(minutes>120){
                hours = (Math.floor(elapsed/3600000)).toString();
                timeString = hours+' HOURS';
            }
        }
        hintBar.innerHTML = timeString;
    }else if(statState==1){
        if(swaps==1){
            hintBar.innerHTML = '1 SWAP';
        }else{
            hintBar.innerHTML = swaps+' SWAPS';            
        }
    }else{
        hintBar.innerHTML = 'STATISTICS'
    }
    statState = (statState + 1)%3
}

function showDictionary(){
    dictionaryContainer = document.createElement("div");
    dictionaryContainer.className = 'dictionary-container';
    document.body.appendChild(dictionaryContainer);
    dictionaryScreen = document.createElement("div");
    dictionaryScreen.className = 'dictionary-screen';
    dictionaryScreen.innerHTML = wordList.join('<br>');
    dictionaryContainer.append(dictionaryScreen);
    dictionaryCloser = document.createElement("div");
    dictionaryCloser.className = "dictionary-closer";
    dictionaryCloser.innerHTML = "X";
    dictionaryScreen.after(dictionaryCloser);
    dictionaryCloser.onclick = function(){
        dictionaryContainer.remove();
        dictionaryScreen.remove();
    }
}

initialize();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

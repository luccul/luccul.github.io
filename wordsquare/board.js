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
        celebrated = true;
        display();
        hintBar.onclick = function(){};
        hintBar.style.cursor = 'default';
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
            hintBar.innerHTML = "PLAY AGAIN"
            hintBar.onclick = function(){again();}
            hintBar.style.cursor = 'pointer';
        },2000);
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

function showDictionary(){
    dictionaryContainer = document.createElement("div");
    dictionaryContainer.className = 'dictionary-container';
    document.body.appendChild(dictionaryContainer);
    dictionaryScreen = document.createElement("div");
    dictionaryScreen.className = 'dictionary-screen';
    dictionaryScreen.innerHTML = wordList.join('<br>');
    dictionaryContainer.append(dictionaryScreen);
    dictionaryScreen.onclick = function(){
        dictionaryContainer.remove();
        dictionaryScreen.remove();
    }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

initialize();

var rows = [];
var cols = [];
var numRows = 4;
var numCols = 4;
var cells = [];
var tiles = [];
var solution = solutions[Math.floor(Math.random()*solutions.length)];
var activeIndex = -1;
var board = document.getElementById("board");
var hintBar = document.createElement("div");
var hints = 0; 

function initialize(){            
    for(let i=0;i<numRows;i++){
        let row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        for(let j=0;j<numCols;j++){
            let cellIndex = j+i*numCols;
            tiles.push({});
            cells.push({});
            tiles[cellIndex].letter = solution.split(" ").join("").toUpperCase()[cellIndex];
            tiles[cellIndex].bgcolor = "white";
            tiles[cellIndex].textcolor = "black";
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
    hintBar.className = "hint";
    hintBar.innerHTML = "HINT";
    hintBar.onclick = function(){hint();};
    board.after(hintBar);
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
        cell.element.style.color = tile.textcolor;
        cell.element.style.cursor = tile.cursor;
    })
}

function isRevealed(tileIndex){
    return tiles[tileIndex].isRevealed;
}

function activate(cellIndex){
    let tileIndex = cells[cellIndex].tileIndex;
    if(!isRevealed(tileIndex)){
        console.log(tiles[tileIndex]);
        if(activeIndex==-1){
            tiles[tileIndex].bgcolor = 'gray';
            tiles[tileIndex].cursor = 'default';
            activeIndex = tileIndex;
            display();
        }else{
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
    tiles[activeIndex].bgcolor='white';
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
        hints+=1;
        tiles[hintIndex].bgcolor = 'black';
        tiles[hintIndex].textcolor = 'white';
        tiles[hintIndex].cursor = 'default';
        tiles[hintIndex].isRevealed = true;
        swap(hintIndex,cells[hintIndex].tileIndex);
        display();
    }
    if(finished()){
        celebrate();
    }
}

function celebrate(){
    tiles.forEach(tile=>{
        let cell = cells[tile.cellIndex]; 
        tiles[cell.tileIndex].isRevealed = true;
        tiles[cell.tileIndex].cursor = 'default';
        cell.element.style.transition = 'all 5s';
        cell.element.style.backgroundColor = 'black';
        cell.element.style.color = 'white';
        cell.element.style.cursor = 'default';
        cell.element.onclick = function(){};
    })
    hintBar.onclick = function(){};
    hintBar.style.cursor = 'default';
    setTimeout(display,5000);
    fetch("https://docs.google.com/forms/d/e/1FAIpQLScuAhejd5Ynj2T9WYhl_Y90UotsZ22Sl4jDRaQ5I1tuPibkrg/formResponse?usp=pp_url&entry.34160038="+solution.split(" ").join("+")+"&entry.1571849764="+hints.toString()+"&Submit=submit");
}

initialize();


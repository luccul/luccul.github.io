N = syntangulisms.length;

function generate(){
   i = Math.floor(Math.random()*N);
   syntangulism = syntangulisms[i];
   document.getElementById("syntangulism").innerHTML = syntangulism.toUpperCase();
}

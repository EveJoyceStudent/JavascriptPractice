

var currentnote="";
var notes = new Array("test 1", "test 2");

notes.forEach(myFunction);
function myFunction(element){
    currentnote=currentnote + "<li>" + element +"</li>";
}
document.getElementById("output").innerHTML = currentnote;


function add_item(){
    notes.push("item");
    document.getElementById("output").innerHTML = currentnote;
}
function button_2(){
    currentnote="";
    document.getElementById("output").innerHTML = currentnote;
}
function button_3(){
    notes.forEach(myFunction);
    document.getElementById("output").innerHTML = currentnote;
}

function button_4(){
    notes.push("item");
    currentnote="";
    notes.forEach(myFunction);
    document.getElementById("output").innerHTML = currentnote;
}
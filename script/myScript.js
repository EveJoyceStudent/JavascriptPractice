

var currentnote="";
var notes = new Array("test 1", "test 2");

notes.forEach(myFunction);
function myFunction(element){
    currentnote=currentnote + "<li>" + element +"</li>";
}
document.getElementById("output").innerHTML = currentnote;


function add_item(){
    notes.push("item");
    var currentnote="";
    notes.forEach(myFunction);
    document.getElementById("output").innerHTML = currentnote;
}
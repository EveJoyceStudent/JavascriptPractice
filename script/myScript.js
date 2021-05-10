

var currentnote="";
var notes = new Array();


function addListTag(element, index){
    currentnote+='<div id="noteContainer' + index + '"><span id="note' + index + '">' + element +"</span>" +
                ' <button id="complete' + index + 'button" onClick="complete('+"'note"+ index + "'"+')">complete item </button>' +
                ' <button id="note' + index +  'button" onClick="remove_item('+ index + ')">remove item </button>' +"</div>";
}

notes.forEach(addListTag);
document.getElementById("output").innerHTML = currentnote;


function refresh(){
    currentnote="";
    notes.forEach(addListTag);
    document.getElementById("output").innerHTML = currentnote;
}

function add_item(){
    var x = document.getElementById("form1");
    notes.push(x.elements[0].value);
    refresh();
}

function remove_item(index){
    notes.splice(index,1);
    refresh();

}

function clearList(){
    notes = [];
    refresh();

}

function complete(id){
    document.getElementById(id).style.textDecorationLine = "line-through";
}
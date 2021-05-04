var currentnote="";
var notes = new Array();
var category = new Array();
var counter = 1;

category.push('cat1');
category.push('cat2');
category.push('cat3');

function addcategory(element, index){
    currentnote+='<option value="'+element+'">'+element+'</option>';
    console.log('element= '+element+'index= '+index);
}

category.forEach(addcategory);

console.log(document.getElementById("category"));
console.log(document.getElementById("output"));

document.getElementById('category').innerHTML+=currentnote;

function addListTag(element, index){
    document.getElementById("output").innerHTML+='<div id="noteContainer' + index + '"><span id="note' + index + '">' + element +"</span>" +
                ' <button id="complete' + index + 'button" onClick="complete('+"'"+ index + "'"+')">complete item </button>' +
                ' <button id="note' + index +  'button" onClick="remove_item('+ index + ')">remove item </button>' +"</div>";
    console.log(document.getElementById("output"));
}

function add_item(){
    var x = document.getElementById("form1");
    // notes.push(x.elements[0].value);
    addListTag(x.elements[0].value,counter);

    // console.log(notes);
    counter ++;

}

function remove_item(index){
    // if(index=notes.length){
    //     notes.pop;
    // } else {
    // notes.splice(index-1,1);
    // }

    document.getElementById('output').removeChild(document.getElementById('noteContainer'+index));

    // the indexes on the html items don't get updated to match notes array so it breaks..

    // document.getElementById('output')
    // notes.forEach()

    // console.log(notes);

}

function clearList(){
    notes = [];
    document.getElementById("output").innerHTML="";
}

function complete(id){
    // console.log(document.getElementById('note'+id).style.textDecorationLine);
    
    if(document.getElementById('note'+id).style.textDecorationLine==''){
        document.getElementById('note'+id).style.textDecorationLine = "line-through";
        document.getElementById('complete'+id+'button').innerHTML='uncomplete item';
    }
    else{
        document.getElementById('note'+id).style.textDecorationLine = '';
        document.getElementById('complete'+id+'button').innerHTML='complete item';
    }

}

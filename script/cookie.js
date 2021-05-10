var cookies = 1;
var upgradeStorage = [0,1,0];
var upgradeCost = [10,10,100];
var upgradeDescription = ["1 cookie per second, no. owned: ", "+1 cookie per click, current cookies per click: ","This upgrade is useless...: "];

var popuptype=-1;
var popupResetCounter=0;


for (var i = 0; i < upgradeStorage.length; i++) {
    document.getElementById('upgrade-section').innerHTML+='<div id="upgrade'+(i+1)+'" onmousedown="upgrade('+(i+1)+')"><span>'+upgradeDescription[i]+'<span id="upgrade'+(i+1)+'counter">0</span></span><div class="cost">Cost: '+upgradeCost[i]+'</div></div>'
}



document.getElementById('info').style.display='none';

document.getElementById('cookie-counter').innerHTML=cookies;

function cookie_mouseover(){
    document.getElementById('cookieImage').src='images/cookiehover.png';
}
function cookie_mouseout(){
    document.getElementById('cookieImage').src='images/cookie.png';
}
function cookie_mousedown(){
    document.getElementById('cookieImage').src='images/cookieclick.png';
}
function cookie_mouseup(){
    document.getElementById('cookieImage').src='images/cookiehover.png';
}

function cookie_button(){
    cookies+=upgradeStorage[1];
    document.getElementById('cookie-counter').innerHTML=cookies;

    if(upgradeStorage[1]==1){
        document.getElementById('log').innerHTML='<div>'+upgradeStorage[1]+' cookie clicked</div>'+document.getElementById('log').innerHTML
    } else {
        document.getElementById('log').innerHTML='<div>'+upgradeStorage[1]+' cookies clicked</div>'+document.getElementById('log').innerHTML
    }
    
    if(popuptype>-1){
        if(upgradeCost[popuptype-1]-cookies>0){
            document.getElementById('popup-info').innerHTML='not enough cookies, you need '+(upgradeCost[popuptype-1]-cookies)+' more cookies';
        } else{
            document.getElementById('popup-info').innerHTML='you now have enough cookies';
        }
    }
}

function upgrade(upgradeNo){
    if(cookies<upgradeCost[upgradeNo-1]){
        document.getElementById('popup-info').innerHTML='not enough cookies, you need '+(upgradeCost[upgradeNo-1]-cookies)+' more cookies';
        popuptype=upgradeNo;
        popupResetCounter=10;
        document.getElementById('info').style.display='';
    } else {
        cookies-=upgradeCost[upgradeNo-1];
        upgradeStorage[upgradeNo-1]++;
        document.getElementById('popup-info').innerHTML='upgrade '+upgradeNo+' purchased, level is '+upgradeStorage[upgradeNo-1];
        document.getElementById('info').style.display='';
        popuptype=-1;
        popupResetCounter=5;
        document.getElementById('upgrade'+upgradeNo+'counter').innerHTML=upgradeStorage[upgradeNo-1];
        document.getElementById('cookie-counter').innerHTML=cookies;
    
        document.getElementById('log').innerHTML='<div>upgrade '+upgradeNo+' purchased</div>'+document.getElementById('log').innerHTML;
    }
}

function update(){
    if(popupResetCounter>0){
        popupResetCounter--;
    } else {
        document.getElementById('info').style.display='none';
    }
    if(upgradeStorage[1-1]>0){
        cookies+=upgradeStorage[1-1];
        document.getElementById('cookie-counter').innerHTML=cookies;
        if(popuptype>-1){
            if(upgradeCost[popuptype-1]-cookies>0){
                document.getElementById('popup-info').innerHTML='not enough cookies, you need '+(upgradeCost[popuptype-1]-cookies)+' more cookies';
            } else{
                document.getElementById('popup-info').innerHTML='you now have enough cookies';
            }
        }

        if(upgradeStorage[1-1]==1){
            document.getElementById('log').innerHTML='<div>'+upgradeStorage[1-1]+' auto cookie</div>'+document.getElementById('log').innerHTML;
        } else {
            document.getElementById('log').innerHTML='<div>'+upgradeStorage[1-1]+' auto cookies</div>'+document.getElementById('log').innerHTML;
        }
    }
}

setInterval(update, 1000);

function showHideLog(){
    console.log(document.getElementById('showHideLog').innerHTML);
    if (document.getElementById('showHideLog').innerHTML=='Show Log'){
        document.getElementById('showHideLog').innerHTML='Hide Log';
        document.getElementById('logtitle').style.display='';
        document.getElementById('log').style.display='';

    } else {
        document.getElementById('showHideLog').innerHTML='Show Log';
        document.getElementById('log').style.display='none';
        document.getElementById('logtitle').style.display='none';
    }
}
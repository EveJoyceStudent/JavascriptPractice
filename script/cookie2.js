
var time = 0;
document.getElementById('time-counter').innerText=Math.floor(time/3600)+':'+zeroFill(Math.floor(time/60),2)+':'+zeroFill(time % 60,2);

// animate the cookie drop
var anim = true;
var positionupdate = Math.random();
var cookiedrop = document.querySelector('#element');
// call this function whenever new cookie
function ani(animationElement) {
    if(anim){

        cookiedrop = document.getElementById(animationElement);
        
        // set a random x postition
        positionupdate = Math.random();
        cookiedrop.style.setProperty('--randomposition', 100*positionupdate +'vw');

        // do the drop
        // -> removing the class
        cookiedrop.classList.remove("animation");
    
        // -> triggering reflow /* The actual magic */
        // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
        cookiedrop.offsetWidth = cookiedrop.offsetWidth;
    
        cookiedrop.classList.add('animation');
    }
}
  
// set up upgrades
var cpsUpgrade = {
    name: "cookie per second",
    description: "+1 cookie per second",
    ownedDescription: "Current cookies per second: ",
    cost: 1,
    owned: 0,
    maxLevel:10
}

var clickUpgrade = {
    name: "cookies per click",
    description: "+1 cookie per click",
    ownedDescription:"Current cookies per click: ",
    cost: 2,
    owned : 1,
    maxLevel:100
}

var uselessUpgrade = {
    name : "useless",
    description : "This upgrade is useless...",
    ownedDescription : "You own: ",
    cost : 10,
    owned : 0,
    maxLevel:1
}

var uselessUpgrade2 = {
    name : "also useless",
    description : "This upgrade is also useless...",
    ownedDescription : "You own: ",
    cost : 100,
    owned : 0,
    maxLevel:1
}

var timedClickUpgrade = {
    name: "bonus cookies per click",
    description: "+10 time exclusive bonus cookies per click",
    ownedDescription:"Bonus cookies per click: ",
    cost: 2,
    owned : 0,
    maxLevel:100
}

var upgrades = [cpsUpgrade, clickUpgrade, timedClickUpgrade, uselessUpgrade, uselessUpgrade2];

// initialise cookie counter
var cookies = 0;

// initialise variables for pop-up in info section
var popuptype=-1;
var popupResetCounter=0;

// create the upgrades section
for (var i = 0; i<upgrades.length; i++){
    document.getElementById('upgrade-section').innerHTML+=
    '<div class="upgrade" id="upgrade'+i+'" onmousedown="upgrade('+i+')"><div class ="upgradeDescription">'+upgrades[i].description
        +'</div><div class="upgradeOwned">'+upgrades[i].ownedDescription+'<span id="upgrade'+i+'counter">'+upgrades[i].owned+'</span> of '+upgrades[i].maxLevel+'</div><div class="upgradeCost">Cost: '+upgrades[i].cost+'</div></div>'
}

// hide the info section by default
document.getElementById('info').style.display='none';

// set the cookiecounter value on page load
document.getElementById('cookie-counter').innerHTML=cookies;

// update the cookie image on mouseover
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

function PopupAlter(type, create){
    if(create){
        popuptype=type;
        popupResetCounter=10;
    }
    if(type!=-1){
        if(upgrades[type].owned>=upgrades[type].maxLevel){
            document.getElementById('popup-info').innerHTML='maximum upgrade level reached for this upgrade';
            popuptype=-1;
            document.getElementById('info').style.display='';
        } else{
            if(upgrades[type]==timedClickUpgrade && time<60){
                document.getElementById('popup-info').innerHTML='you can\'t buy that till you\'ve been here a minute';
                document.getElementById('info').style.display='';
            } else{
                if(cookies<upgrades[type].cost){
                    document.getElementById('popup-info').innerHTML='not enough cookies, you need '+(upgrades[type].cost-cookies)+' more cookies';
                    document.getElementById('info').style.display='';
                }
            }
        }
    }
}

// when the cookie is clicked
function cookie_button(){
    // animate the cookie drop
    ani('clickCookie');
    // add cookies equivalent to the cookies per second upgrade and update the cookie counter
    cookies+=clickUpgrade.owned+timedClickUpgrade.owned;
    document.getElementById('cookie-counter').innerHTML=cookies;

    // update log, if is to add an s to cookies for correct grammar in log message
    if(clickUpgrade.owned==1&& timedClickUpgrade.owned==0){
        document.getElementById('log').innerHTML='<div>'+(clickUpgrade.owned+timedClickUpgrade.owned)+' cookie clicked</div>'+document.getElementById('log').innerHTML
    } else {
        document.getElementById('log').innerHTML='<div>'+(clickUpgrade.owned+timedClickUpgrade.owned)+' cookies clicked</div>'+document.getElementById('log').innerHTML
    }
    
    // if there is a popup about not enough cookies, update it
    PopupAlter(popuptype,false);
}

// function called on clicking an upgrade, called from the section in the upgrade setup loop
function upgrade(upgradeNo){
    PopupAlter(upgradeNo,true);
    if(upgrades[upgradeNo].owned>=upgrades[upgradeNo].maxLevel){
    } else{
        if(upgrades[upgradeNo]==timedClickUpgrade && time<60){
        } else{
            if(cookies<upgrades[upgradeNo].cost){
            } else {
                cookies-=upgrades[upgradeNo].cost;
                if(upgrades[upgradeNo]==timedClickUpgrade){
                    upgrades[upgradeNo].owned+=10;
                } else{
                    upgrades[upgradeNo].owned++;
                }
                document.getElementById('popup-info').innerHTML=upgrades[upgradeNo].name+' upgrade purchased, level is '+upgrades[upgradeNo].owned;
                document.getElementById('info').style.display='';
                popuptype=-1;
                popupResetCounter=5;
                document.getElementById('upgrade'+upgradeNo+'counter').innerHTML=upgrades[upgradeNo].owned;
                document.getElementById('cookie-counter').innerHTML=cookies;
                
                document.getElementById('log').innerHTML='<div>'+upgrades[upgradeNo].name+' upgrade purchased</div>'+document.getElementById('log').innerHTML;
            }
        }
    }
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

// function to update things
function update(){
    time++;
    document.getElementById('time-counter').innerText=Math.floor(time/3600)+':'+zeroFill(Math.floor(time/60),2)+':'+zeroFill(time % 60,2);
    if(popupResetCounter>0){
        popupResetCounter--;
    } else {
        document.getElementById('info').style.display='none';
    }
    if(cpsUpgrade.owned>0){
        ani('perSecCookie');
        cookies+=cpsUpgrade.owned;
        document.getElementById('cookie-counter').innerHTML=cookies;
        PopupAlter(popuptype,false);

        if(cpsUpgrade.owned==1){
            document.getElementById('log').innerHTML='<div>'+cpsUpgrade.owned+' auto cookie</div>'+document.getElementById('log').innerHTML;
        } else {
            document.getElementById('log').innerHTML='<div>'+cpsUpgrade.owned+' auto cookies</div>'+document.getElementById('log').innerHTML;
        }
    }
}

setInterval(update, 1000);

function showHideLog(){
    // console.log(document.getElementById('showHideLog').innerHTML);
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

function onOffAnim(){
    if (document.getElementById('onOffAnimButton').innerHTML=='Turn Off Animation'){
        document.getElementById('onOffAnimButton').innerHTML='Turn On Animation';
        anim = false;

    } else {
        document.getElementById('onOffAnimButton').innerHTML='Turn Off Animation';
        anim = true;
    }
}

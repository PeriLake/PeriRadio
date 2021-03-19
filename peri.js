Array.prototype.randomsorting = function (){return this.sort(() => Math.random() - 0.5)}
Array.prototype.elementdelete = function(b){if(this.includes(b)){return this.splice(this.indexOf(b),1)};return this}
Array.prototype.randomelement = function (){return a[Number.randomnumber(0,this.lenght-1)]}

Object.prototype.istype = function () {return typeof this}
Object.prototype.opencode = function(){return require('util').inspect(this,{depth:1000})}

Number.prototype.randomnumber = function (a,b){return Math.floor(Math.random() * (b - a + 1)) + b;}

String.prototype.convertbool=function(){if(this.isbool()){return this.toLowerCase()=="true"?true:false}else{return "it is not bool string"}}
String.prototype.convertnumber=function(){if(this.isnumber()){return parseInt(this)}else{return "it is not int string"}}
String.prototype.isbool=function(){if(["true","false"].some(e=> this.toLowerCase()==e))return true;return false;}
String.prototype.isnumber = function(){return isNaN(parseInt(this))?false:true}
String.prototype.turkletter = function (){if(this.toLowerCase().replace(/[a-z0-9:;?*\\=\)\(\/&+%+^>£#$½{\[\]}'!\-_.,~<"\|]/g).length<=0){return false}return true}
String.prototype.setduration = function(){
    var thi=parseInt(this),hrs=~~(thi/3600),mins=~~((thi%3600)/60),secs=~~thi%60,ret="";
    if (hrs>0) {ret+=""+hrs+":"+(mins<10?"0":"")}
    ret+=""+mins+":"+(secs<10?"0":"");ret+=""+secs;return ret;}

Date.prototype.today = function () {return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();}
Date.prototype.timeNow = function () {return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();}

console.__proto__.messager = function (){for(var i=0;i<arguments.length;i++){console.log(arguments[i])}}

//

class Logger {
    constructor(){this.logarray=[]}
    glue(){
        var ar=[];
        for(var i=0;i<arguments.length;i++){ar.push(arguments[i])}
        var txt=ar.shift();
        return ar.join("")+txt+"\x1b[0m"
    }
    send(){var s='',d=new Date();
        for(var i=0;i<arguments.length;i++){s+=arguments[i]}
        console.log(s)
         if(this.logarray.length>=70){this.logarray.shift()}
         this.logarray.push(JSON.parse(`{"time":"${d.today()}-${d.timeNow()}","message":"${s.replace(/\\x1b\[[0-9]{1,2}m/g)}"}`))
    }
    sendtimelog(){var s='',d=new Date();
        for(var i=0;i<arguments.length;i++){s+=arguments[i]}
        console.log(`\x1b[36m[${d.today()} ${d.timeNow()}]: \x1b[0m`+s)
         if(this.logarray.length>=70){this.logarray.shift()}
         this.logarray.push(JSON.parse(`{"time":"${d.today()}-${d.timeNow()}","message":"${s.replace(/\\x1b\[[0-9]{1,2}m/g)}"}`))
    }
    logs(){return this.logarray}
}

Logger.prototype.bgcolors = {
    red:"\x1b[41m",
    green:"\x1b[42m",
    yellow:"\x1b[43m",
    cyan:"\x1b[44m",
    purple:"\x1b[45m",
    blue:"\x1b[46m",
    white:"\x1b[47m",
    default:"\x1b[0m"}
Logger.prototype.colors ={
    red:"\x1b[31m",
    green:"\x1b[32m",
    yellow:"\x1b[33m",
    cyan:"\x1b[34m",
    purple:"\x1b[35m",
    blue:"\x1b[36m",
    white:"\x1b[37m",
    default:"\x1b[0m"}

    module.exports = {
        Logger:Logger
    }
var bodyParser = require('body-parser');var express = require('express');
var app = express();
const fs = require('fs');
const { getAudioDurationInSeconds } = require('get-audio-duration');
const { setTimeout } = require("timers");
const e = require("express");
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
let sounds=[];
var saniye=24000;
var nowmusic;
var time;

Date.prototype.today = function () {return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();}
Date.prototype.timeNow = function () {return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();}

var log = {
   message:(e,b)=>{var s=new Date;console.log("\x1b[36m%s\x1b[0m",`[${s.today()} ${s.timeNow()}]: `,"\x1b[35m",e,`\x1b[33m${b}\x1b[0m`)},
   error:(e,b)=>{var s=new Date;console.log("\x1b[36m%s\x1b[0m",`[${s.today()} ${s.timeNow()}]: `,"\x1b[31m",e,`\x1b[37m${b}\x1b[0m`)}
}

reload()
function newmusic(){
    if(sounds.length<=0) {log.message("NewMusic: ","Reload Calling");}
    if(sounds.length<=0) return reload();
var s=sounds.shift();
nowmusic=s;
time=0;
log.message("NewMusic Loaded.","NewMusic Json: "+opencode(s))}

function tempreload(){let temparray=[]
    fs.readdirSync("./musics").forEach(a=>{
        getAudioDurationInSeconds("./musics/"+a).then(e=>{temparray.push({filename:`${a}`,duration:`${Math.round(e)}`})
            log.message("Reload:",` New Item {filename:"${a}",duration:"${Math.round(e)}"}`)
        })
    });
return temparray
}

function reload(){sounds=[];
    sounds=tempreload();
    setTimeout(()=>{
        log.message("Reload: ",`Success; MusicsList Length: ${sounds.length}`);
        log.message("Reload: ","NewMusic Calling")
        newmusic()
    },2000)
    return true;
}

function opencode(e){return require("util").inspect(e,{depth:10})}

setInterval(e=>{try{
    time++;
    if(time>=nowmusic.duration||!nowmusic){log.message("Interval: ","NewMusic Calling");newmusic();}
    }catch(e){log.error("Interval Error: ",e)}},1000)

log.message("Application: ","Functions Loaded")
app.get('/stream', (req, res) => {
        var stream=fs.createReadStream("./musics/"+nowmusic.filename,{start:saniye*time});
            res.writeHead(200, {'Content-Type': 'audio/mpeg'});
            stream.pipe(res)
});
app.get('/api/restart', (req, res) => {if(req.query.token==".admin-^%"){reload();res.send("Success")}else{console.log(req.query);res.send("Wrong")};});
app.get('/api/skip', (req, res) => {if(req.query.token==".admin-^%"){newmusic();res.json(nowmusic)}else{console.log(req.query);res.send({filename:"Wrong"})};});
app.get('/stream/details/now', (req, res) => {res.json({filename:nowmusic.filename,duration:nowmusic.duration,now:time});});
app.get('/stream/details/now/time', (req, res) => {res.json(`${time}/${nowmusic.duration}`)});
app.get('/stream/details/playlist', (req, res) => {res.json(sounds);});

app.post('/api/login', (req, res) => {if(!req.body||!req.body.username||!req.body.password||req.body.username!="admin"||req.body.password!="") return res.render(__dirname+'/pages/error.ejs',{code:"403",message:"Yetkisiz Giriş","color":"#ff6e6e","background":"#000000"});
res.render(__dirname+"/pages/admin.ejs",{token:`.${req.body.username}-${req.body.password}%`,username:"Admin"})})

app.get('/api/list', (req, res) => {if(req.query.password==".admin-^%"){res.sendFile(__dirname+'/pages/list.html')}else{res.render(__dirname+'/pages/error.ejs',{code:"403",message:"Yetkisiz Giriş","color":"#ff6e6e","background":"#000000"});} })
app.get('/login', (req, res) => res.sendFile(__dirname+'/pages/login.html'));
app.get('/', (req, res) => res.sendFile(__dirname+'/pages/main.html'));
app.get('/api', (req, res) => res.sendFile(__dirname+'/pages/preparing.html'));
app.get('*', (req, res) => res.render(__dirname+'/pages/error.ejs',{code:"404",message:"Not Found","color":"#ff6e6e","background":"#000000"}));
const listener = app.listen(80, () => {log.message("Application: ","Your app is listening on port " + listener.address().port);});

process.on('unhandledRejection', error => {console.error('JavaScript Hatası: ', error);});
//server.js
var request = require('request')
var url = require('url')
var ejs = require('ejs')
var express = require('express')
var app =express();
app.listen(8080)
app.set('views',__dirname);
MY_IP = "77.51.91.245";

var categories = {
    'auto' : "Автомобили",
    'world' : "В мире",
    'internet' : "Интернет",
    'sport' : "Спорт",
    'culture' : "Культура",
    'movies' : "Фильмы",
    'politics' : "Политика",
    'index': "Главные новости"
}
app.get('/yandex/:cnt/news/for/:search',function(req,response){
    var search =req.params.search;
    if(!(search in categories)){
        search = 'index';
    }
    var name = categories[search];
    var cnt =req.params.cnt; 
    var options = {
        protocol :'http',
        host: 'ajax.googleapis.com',
        pathname:'ajax/services/feed/load',
        query:{
            v:'1.0',
            num:cnt,
            userip:MY_IP,
            q:'http://news.yandex.ru/'+search+'.rss'
        }
    }
    var searchURL = url.format(options)
    request(searchURL,function(err,res,body){
        var news = JSON.parse(body);
        response.render('yandex-news.ejs',{
            news:news.responseData.feed,
            category:search,
            count:cnt
        })
    })
})

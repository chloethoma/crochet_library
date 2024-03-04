const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));

const crochetLibrary = [
    {
        "_id":1,
        "name":"Taro le dino",
        "category":"Amigurumi",
        "pattern" : {
            "name":"taro le dino",
            "origin":"cultura"
        },
        "technical":{
            "hookSize":3,
            "stitch":["mailles serées", "cercle magique"]
        },
        "wool":{
            "name":"Ricorumi",
            "brand":"Ricorumi",
            "type":"coton"
        },
        "notes":"facile à faire"
    },
    {
        "_id":2,
        "name":"Hochet citron",
        "category":"Amigurumi",
        "pattern" : {
            "name":"hochet citron",
            "origin":"hobbi"
        },
        "technical":{
            "hookSize":3,
            "stitch":["mailles serées", "cercle magique"]
        },
        "wool":{
            "name":"Ricorumi",
            "brand":"Ricorumi",
            "type":"coton"
        },
        "notes":"facile à faire"
    },
    {
        "_id":3,
        "name":"Pochette écouteurs",
        "category":"Accessoire",
        "pattern" : {
            "name":"pochette écouteurs",
            "origin":"hibouchoucaillou"
        },
        "technical":{
            "hookSize":3,
            "stitch":["granny square"]
        },
        "wool":{
            "name":"",
            "brand":"",
            "type":"coton"
        },
        "notes":"facile à faire et très pratique"
    },
];

app.get('/api/library', (req, res, next) => {
    res.status(200).json(crochetLibrary);
});

app.post('/api/library', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({message:"Nouveau projet crée !"})
});

module.exports = app;
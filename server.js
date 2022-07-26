const express = require('express');
const { dirname } = require('path');
const path = require('path');

const notes = require('./develop/db/db.json');
const PORT = process.env.PORT || 3001;
const fs = require('fs');


//Middleware for finding static files
const app = express();


//Middleware for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname +'/public'));

//GET route for home page
app.get('/', (req, res)=>
    res.sendFile(path.join(__dirname, './develop/public/index.html'))
);

//GET route for note page
app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, './develop/public/notes.html')),
    
);

//reads db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res)=>{
    fs.readFile('/develop/db/db.json', "utf-8",(err, data)=>{
        if(err){
            throw err;
        } else {
            console.log("successfully read db file");
            const notes = JSON.parse(data);
            res.json(notes);
        }
    })
});

//posts a new note
app.post('/api/notes', (req, res)=>{
    const newNote ={
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('/develop/db/db.json',"utf-8",(err, data)=>{
        if(err){
            throw err;
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile('/develop/db/db.json', JSON.stringify(notes, null, 4), (err, data)=>{
                if(err){
                    throw err;
                } else {
                    res.json({data: req.body, message: "successfully created new note!"});
                  
                }
            })
            
        }
    })


});




app.listen(PORT, ()=>
    console.log(`App listening at http://localhost:${PORT}`)
);


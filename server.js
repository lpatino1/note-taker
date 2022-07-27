const express = require('express');
const { dirname } = require('path');
const path = require('path');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const uuid = require('./uuid');


//Middleware for finding static files
const app = express();


//Middleware for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

//GET route for home page
app.get('/', (req, res)=>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET route for note page
app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, './public/notes.html')),
    
);

//reads db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res)=>{
    fs.readFile('./db/db.json', "utf-8",(err, data)=>{
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
        text: req.body.text,
        id: uuid()
    }

    fs.readFile('./db/db.json',"utf-8",(err, data)=>{
        if(err){
            throw err;
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err, data)=>{
                if(err){
                    throw err;
                } else {
                    res.json({data: req.body, message: "successfully created new note!"});
                  
                }
            })
            
        }
    })

});

//delete

// app.delete('/api/notes/:id', (req, res)=>{
//     const { requestedId } = req.params.id;
    
//     fs.readFile('./db/db.json', "utf-8", (err, data)=>
//         {if (err){
//             throw err;
//         } else {
//             let notes = JSON.parse(data);
//             res.json(notes);

//             for(let i = 0; i<notes.length; i++){
//                 if(requestedId==notes[i].id){
//                     return res.json(notes[i].id);
                    
//                 }
//             }

//             fs.writeFile('./db/db.json',"utf-8",(err, data)=>{
//                 if(err){
//                     throw err;
//                 } else {
//                     res.json({data: req.body, message: "successfully created new note!"});
//                 }
//             });
//         }   

//     });
// })


app.listen(PORT, ()=>
    console.log(`App listening at http://localhost:${PORT}`)
);


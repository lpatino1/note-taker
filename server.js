const express = require('express');
const { dirname } = require('path');
const path = require('path');
// const  api = require('./Develop/public/index.js');
const notes = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3001;


//Middleware for finding static files
const app = express();


//Middleware for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('./Develop/public/index.js', api);

app.use(express.static('public'));

//GET route for home page
app.get('/', (req, res)=>
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

//GET route for note page
app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, './Develop/public/notes.html')),
    
);








app.listen(PORT, ()=>
    console.log(`App listening at http://localhost:${PORT}`)
);


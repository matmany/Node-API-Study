const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const data = require('./urls.json');
const mySavedData = require('./saved.json');

const dataPath = path.join(__dirname,'urls.json');
const mySavedPath = path.join(__dirname,'saved.json');

function writeFile(cb){
    fs.writeFile(
        mySavedPath,
        JSON.stringify(mySavedData,null, 2),
        err =>{
            if(err) throw err
            
            cb(JSON.stringify({message:'ok'}))
        }
    )
}

http.createServer(
    (req, res) => {
        const {type, title} = URL.parse(req.url,true).query;

        //permitir acesso de qualquer lugar
        res.writeHead(200, {
            'Access-Control-Allow-Origin':'*'
        })

        //get All movies
        
        if(type == 0) {
            return res.end(JSON.stringify(data));
        }

        //get only from list
        if(type == 1){
            return res.end(JSON.stringify(mySavedData));
        }

        //Remove from mylist
        if(type == '2') {
            mySavedData.movies = mySavedData.movies.filter(item => String(item.Title) != String(title));

            return writeFile((message)=>{
                res.end(message)
            });

        }

        //add to mylist
        if(type == '3'){
            selectedMovie = data.movies.find( item=> String(item.Title) == String(title));
            mySavedData.movies.push(selectedMovie);
            return writeFile((msg)=>{
                res.end(msg);
            })
        }
    }
).listen(7000, console.log("API runing"))
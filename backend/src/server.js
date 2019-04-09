const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io =  require('socket.io')(server);

io.on("connection", socket=>{
    socket.on('connectRoom', box =>{
		socket.join(box);	
	});
});

mongoose.connect('url-mongodb-atlas', {
    userNewUrlParser: true
};

app.use((req,res)=>{
	req.io = io;
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.user('/files', express.static(path.resolve(_dirname, '..','tmp'));


app.use(require('./routes.js'));


server.listen(3333);



let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let bodyParser = require('body-parser');
let portName = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.listen(process.env.PORT || portName, function () {
    console.log(`listen to port ${portName}`)
});
app.post('/notify', function (req, res) {
	io.sockets.emit(req.body.channel_name, req.body.object )
        console.log(req.body.channel_name)
        res.send({message: 'hello there'});

});
app.get('/test', function(req, res){
    res.send('Realtimeserver is up and running.');
});

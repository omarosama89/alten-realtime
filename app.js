let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let bodyParser = require('body-parser');
let portName = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.listen(process.env.PORT || 4000, function () {
    console.log(`listen to port ${portName}`)
});
app.post('/notify', function (req, res) {
    let channel = 'vehicle_notifier';
    let body = req.body;
    io.sockets.emit(`${channel}`, body);
    res.send('What is up ');
});
app.get('/test', function(req, res){
    res.send('I\'m Readyy.');
});
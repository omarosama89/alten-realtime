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
server.listen(portName, function () {
    console.log(`listen to port ${portName}`)
});

app.get('/test', function(req, res){
    io.sockets.emit('vehicle_notifier', {vehicle: {}});
    res.send('What is up ');
})

app.post('/notify', function (req, res) {
    let channel = req.body.channel;
    let body = {};
    if (channel === 'items'){
        body =  {item: req.body.item}
    }else {
        body =  {request: req.body.request}
    }
    console.log(body);
    io.sockets.emit(`${channel}`, body);
    res.send('What is up ');
});


//
// io.on('connection', function (socket) {
//     // console.log('user connect');
//     socket.emit('news', {hello: 'world'});
//     socket.on('news', function (data) {
//         console.log(data);
//     });
// });
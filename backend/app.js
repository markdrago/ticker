//imports
var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');

var get_phrases_waiters = [];

//socket operations
io.sockets.on('connection', function (socket) {
    //console.log(io);
    socket.on('bootstrap', function(data) {
        if (get_phrases_waiters.indexOf(socket.id) === -1) {
            get_phrases_waiters.push(socket.id);
        }
        socket.broadcast.emit('get_phrases', '');
    });

    socket.on('all_phrases', function(data) {
        while (get_phrases_waiters.length > 0) {
            var waiterid = get_phrases_waiters.pop();
            var waiter = io.sockets.sockets[waiterid];
            if (waiter !== undefined) {
                waiter.emit('set_all_phrases', data);
            }
        }
    });

    socket.on('new_phrase', function (data) {
        socket.broadcast.emit('add_phrase', data);
    });
});

//handle regular URL requests
app.listen(80);
function handler(req, res) {
    serve_static_file(req, res);
}

function serve_static_file(req, res) {
    var url = req.url;
    if (url == '/') {
        url = '/index.html';
    }
    
    fs.readFile(__dirname + '/../frontend' + url,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading static file: ' + err);
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}


//imports
var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');

//list of socket IDs waiting for a bootstrap response
var get_phrases_waiters = [];

//socket operations
io.sockets.on('connection', function (socket) {

    //requesting bootstrapping
    socket.on('bootstrap', function(data) {
        //add socket id to list of waiters if it's not already there
        if (get_phrases_waiters.indexOf(socket.id) === -1) {
            get_phrases_waiters.push(socket.id);
        }
        
        //broadcast to all other sockets a request for their phrases
        socket.broadcast.emit('get_phrases', '');
    });

    //a response to the 'get_phrases' request
    socket.on('all_phrases', function(data) {

        //loop over all sockets waiting for a response
        while (get_phrases_waiters.length > 0) {
            //get a single waiter from the list of waiters
            var waiterid = get_phrases_waiters.pop();
            var waiter = io.sockets.sockets[waiterid];
            
            if (waiter !== undefined) {
                //send the waiter the full set of phrases
                waiter.emit('set_all_phrases', data);
            }
        }
    });

    //simple phrase addition, notify all other sockets
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


const path = require('path');

// send client to the front end (client) files
module.exports = function(app) {
    app.get('/', function(req,res) {
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
}
/**
 * Created by NamTV on 6/19/2017.
 */
var request = require('request');
var fs = require('fs');
var USER_KEY = 'WqDw4BkTYa';
var PASSWORD_KEY = '_DxnHX-K';
var URL = 'https://api.fruithosted.net/file/ul?login=WqDw4BkTYa&key=_DxnHX-K&';
function uploadFile(folderId, filePath,callback) {
    request.post(URL + 'folder=' + folderId, function (err, resp, body) {
        if (err) {
            console.log('Error!');
            callback(err);
        } else {
            body = JSON.parse(body);
            var req = request.post(body.result.url, function (err, resp, body) {
               callback(err,body);
            });
            var form = req.form();
            form.append('file', fs.createReadStream(filePath));
        }
    });
}

uploadFile('55902','./video.mp4',function (err,body) {
    console.log(err);
    console.log(JSON.parse(body));
})
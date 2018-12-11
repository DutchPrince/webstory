var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: "448264",                   // NOTE that this was username in 1.x 
    password: "6ZiEsRuXnptfHvv",           // optional, prompted if none given
    host: "sftp.webstory.nl",
    port: 22,
    localRoot: __dirname + '/',
    remoteRoot: '/public/sites/www.webstory.nl/',
    // include: ['*', '**/*'],      // this would upload everything except dot files
    include: ['*.php', 'dist/*'],
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: true,              // delete existing files at destination before uploading
    forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}
 
// use with promises
ftpDeploy.deploy(config)
    .then(res => console.log('finished'))
    .catch(err => console.log(err))
    
// use with callback
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});

ftpDeploy.on('uploading', function(data) {
    data.totalFilesCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.filename;             // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});
ftpDeploy.on('log', function(data) {
    console.log(data);         // same data as uploading event
});
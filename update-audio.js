const fs = require('fs');
const stream = require('stream');
const ffmpeg = require('fluent-ffmpeg');
const https = require('https');
const ytdl = require('ytdl-core')
const playlistModel = require('./models/playlists');
const recordingModel = require('./models/recording');
const connection = require('./data/db');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

let playlists = [];

playlistModel.find({}, function (err, data) {
    if (err) {
        console.log(err);
    }
    playlists = data;
    getPlaylists(playlists)
});


let getPlaylists = (playlists) => new Promise((resolve, reject) => {
    let newList = []
    let i = 0
    for (const playlist of playlists) {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlist.playlistId}&fields=items/contentDetails,items/snippet(title,playlistId,position)&key=${process.env.GOOGLE_KEY}`;
        const req = https.get(url, res => {
            console.log(`statusCode: ${res.statusCode}`);
            let data = '';
            req.on('error', error => {
                reject(error);
                console.error(error)
            })
            res.on('data', d => {
                data += d;
            })
            res.on('end', () => {
                let subArray = [];
                let dataArray = JSON.parse(data);
                //remove items from array if the title is 'Deleted video'
                dataArray.items = dataArray.items.filter(item => item.snippet.title !== "Deleted video")
                i++;
                // check if there are new items
                if (playlist.indexLength < dataArray.items.length) {
                    // check if at least the first new item has a proper title (if skipTitleCheck is not = true)
                    if (!playlist.skipTitleCheck && dataArray.items[playlist.indexLength].snippet.title.includes(':') && dataArray.items[playlist.indexLength].snippet.title.split(/(: ?)/).pop() !== '') {
                        let x = playlist.indexLength + 1;
                        let newIndexLength = playlist.indexLength + 1;
                        // while there are new items, identify index of last item with proper title
                        do {
                            if (dataArray.items[x].snippet.title.includes(':') && dataArray.items[x].snippet.title.split(/(: ?)/).pop() !== '') {
                                newIndexLength++;
                            } else { break }
                            x++;
                        } while (x < dataArray.items.length);
                        // after above index is identified, add upto this index to array of new items
                        subArray = dataArray.items.slice(playlist.indexLength, newIndexLength)
                        playlist.indexLength = newIndexLength;
                    } else if (playlist.skipTitleCheck) {
                        subArray = dataArray.items.slice(playlist.indexLength, dataArray.items.length)
                    }
                    newList.push.apply(newList, subArray);
                }
                if (i === playlists.length) {
                    console.log('resolved');
                    console.log(newList);
                    resolve(newList);
                }
            })
            req.end();
        })
    }
}).then((list) => {
    if (list.length > 0) {
        let finalList = [];
        list.forEach(item => {
            let modifiedTitle = item.snippet.title.split(/(: ?)/).pop();
            if (modifiedTitle !== '') {
                let series = playlists.filter(element => element.playlistId === item.snippet.playlistId)[0].series;
                let newRecording = {
                    series: series,
                    title: modifiedTitle,
                    ytId: item.contentDetails.videoId,
                    number: item.snippet.position,
                    date: item.contentDetails.videoPublishedAt
                };
                finalList.push(newRecording);
            } else { console.log('original: ' + item.snippet.title + ', modified: ' + modifiedTitle) }
        });
        getAudio(finalList);
    }
}).catch((error) => {
    console.log(error + ' - catch error')
});

let addedToDb = false;
let fileName = '';

function uploadFromStream(s3) {
    var pass = new stream.PassThrough();
    const params = {
        ACL: "public-read",
        Bucket: "consciousj",
        Key: fileName,
        Body: pass,
        ContentDisposition: "attachment",
        ContentType: "audio/mp3"
    };
    const manager = s3.upload(params);
    manager.on('httpUploadProgress', (progress) => {
        console.log('progress', progress);
    });
    s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`);
    });
    return pass
};

const getAudio = (list) => {
    for (const item of list) {
        fileName = `audio/${item.title}.mp3`;
        const url = 'https://www.youtube.com/watch?v=' + item.ytId;
        const audio = ytdl(url);
        ffmpeg().input(audio).format('mp3').pipe(uploadFromStream(s3))
        audio.on('response', function (res) {
            var totalSize = res.headers['content-length'];
            var dataRead = 0;
            res.on('data', function (data) {
                dataRead += data.length;
                var percent = dataRead / totalSize;
                process.stdout.cursorTo(0);
                process.stdout.clearLine(1);
                process.stdout.write((percent * 100).toFixed(2) + '% ');
            });
            res.on('end', function () {
                process.stdout.write('\n');
                addToDb(item)
            });
        });
    };
};


function addToDb(item) {
    const newRecording = new recordingModel(item)
    newRecording
        .save()
        .then(result => {
            console.log(result);
            updatePlaylists(item)
        })
        .catch(err => {
            console.log(err);
        });
}

const updatePlaylists = (item) => {
    console.log('entered updatePlaylists')
    playlistModel.findOneAndUpdate({ series: item.series }, { $inc: { indexLength: 1 } }, { upsert: true, new: true }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    })
}